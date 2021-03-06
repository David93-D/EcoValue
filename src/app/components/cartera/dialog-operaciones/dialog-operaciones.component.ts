import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { filter, fromEvent } from 'rxjs';
import { DataValoresService } from 'src/app/services/data-valores.service';
import { IInfoValor } from 'src/app/interfaces/i-info-valor';
import { IPosicion } from 'src/app/interfaces/i-posicion';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dialog-operaciones',
  templateUrl: './dialog-operaciones.component.html',
  styleUrls: ['./dialog-operaciones.component.css']
})
export class DialogOperacionesComponent implements OnInit {

  listaOp:string[]=["Compra","Venta"];

  comision: number = 0;
  totalOperacion: number = 0;
  n_valores: number = 0;
  precioValor: number = 0;
  tipoOperacion: string = "";
  tickerValorEleg: string = "";
  nombreValorEleg: string = "";
  posicionVender: string = "";
  existe = false;

  posicionesLista:IPosicion[] = [];

  valoresOp: IInfoValor[] = [];

  @ViewChild('valorSeleccionado') valorSeleccionado!: ElementRef;

  constructor(
    private firebase: FirebaseService, 
    private dataValores: DataValoresService
  ) { }

  ngOnInit(): void {    
    this.dataValores.opVal.subscribe( v => this.valoresOp = v );
    this.getPosicionesCartera();
  }

  ngAfterViewInit() {
    fromEvent(this.valorSeleccionado.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.valorSeleccionado.nativeElement.value)
        })
    )
    .subscribe(() => this.buscarOpciones());
  }

  getPosicionesCartera() {
    this.firebase.getPosicionesCartera().subscribe((response: any) => {
      const data = Object.entries(response);
      this.posicionesLista = data.map((e: any) => {
        return e[1];
      })
    });
  }

  buscarOpciones() { 
    this.dataValores.opcionesValores(this.valorSeleccionado.nativeElement.value);
  }

  getValorSel(tickervalor: string, nombrevalor: string) {
    this.tickerValorEleg = tickervalor;
    this.nombreValorEleg = nombrevalor.replace('.', '');
    this.getPrecio();
  }

  getPrecio() {
    this.dataValores.getPrecioValor(this.tickerValorEleg).subscribe((response : any) => {
      this.precioValor = response;
      this.getComision();
    });
  }

  getComision() {
    this.comision = 10;
    this.comision.toFixed(2);
    this.getTotalOp();
  }

  getTotalOp() {
    this.totalOperacion = ((this.n_valores * this.precioValor) + this.comision);
    this.totalOperacion.toFixed(2);
  }

  getEliminar(pos: string) {
    this.posicionVender = pos;
    // ELIMINAMOS DE LA BASE DE DATOS
    this.firebase.ventaPosicion(this.posicionVender);
    // ELIMINAMOS DE LA VISTA
    let eliminar: number = 0;
    this.posicionesLista.forEach(element => {
      if (element.ticker === pos) {
        eliminar = this.posicionesLista.indexOf(element);
      }
    });
    this.posicionesLista.splice(eliminar, 1);
  }


  OperarPosicion() {
    if ( this.tipoOperacion == null || this.n_valores == 0 || this.tickerValorEleg == undefined || this.tickerValorEleg == "" ) {
      alert("Faltan datos!!");
    } else {
      switch (this.tipoOperacion) {
        case "Compra":
          //DEBEMOS PRIMERO COMPROBAR SI LA POSICI??N YA EXISTE
          this.posicionesLista.forEach(element => {       
            if (element.ticker == this.tickerValorEleg) {
              this.existe = true;
            }
          });

          if (!this.existe) {
            // SI NO EXISTE ES UNA NUEVA POSICI??N
            let PM = this.totalOperacion / this.n_valores;

            let operacionCompra = {
              nombre: this.nombreValorEleg,
              cantidad: this.n_valores,
              precioMedio: PM,
              ticker: this.tickerValorEleg,
              Total: this.totalOperacion
            }

            this.firebase.comprarPosicion(this.nombreValorEleg, operacionCompra);

          } else {
            // SI EXISTE ES UNA MODIFICACI??N DE LA POSICI??N
            this.firebase.getPosicionParticular(this.nombreValorEleg).subscribe((response: any) => {
              let TotalMod = this.totalOperacion + response.Total;
              let CantMod = this.n_valores + response.cantidad;
              let pm = TotalMod / CantMod;

              let operacionCompra = {
                nombre: this.nombreValorEleg,
                cantidad: CantMod,
                precioMedio: pm,
                ticker: this.tickerValorEleg,
                Total: TotalMod
              }

              this.firebase.comprarPosicion(this.nombreValorEleg, operacionCompra);         

              this.existe = false;

            });

          }

          break;

        case "Venta":
            // DEBEMOS PRIMERO COMPROBAR SI LA POSICI??N EXISTE
            this.posicionesLista.forEach(element => {
              if (element.ticker == this.tickerValorEleg)
                this.existe = true;
            });
          
            if (this.existe) {
              let PM = this.totalOperacion / this.n_valores;
          
              let operacionVenta = {
                nombre: this.nombreValorEleg,
                cantidad: this.n_valores,
                precioMedio: PM,
                ticker: this.tickerValorEleg,
                Total: this.totalOperacion
              }
          
              this.firebase.getPosicionParticular(this.nombreValorEleg).subscribe((response: any) => {
                // DEBEMOS COMPROBAR SI ES UNA VENTA PARCIAL O TOTAL
                if (operacionVenta.cantidad <= response.cantidad) {
                  // SI LA VENTA DE LA POSICI??N ES TOTAL SER?? UN ELIMINAR
                  if (operacionVenta.cantidad == response.cantidad) {
                    this.getEliminar(this.nombreValorEleg);
                  } else {
                    // SI LA VENTA DE LA POSICI??N ES PARCIAL SER?? UNA MODIFICACI??N
                    let cantidadRestante = response.cantidad - operacionVenta.cantidad;
                    let totalRestante = response.Total - operacionVenta.Total;
                    let nuevoPrecioMedio = totalRestante / cantidadRestante;
          
                    let posModif = {
                      nombre: this.nombreValorEleg,
                      cantidad: cantidadRestante,
                      precioMedio: nuevoPrecioMedio,
                      ticker: this.tickerValorEleg,
                      Total: totalRestante
                    }
          
                    this.firebase.comprarPosicion(this.nombreValorEleg, posModif);
          
                  }
                
                } else {
                  // SI EL N??MERO DE VALORES INDICADO ES SUPERIOR A LOS QUE TIENE
                  alert("El n??mero de valores a vender es superior al que tiene!");
                }
              });
            } else {
              alert("No el valor indicado no existe.")
            }

          break;

        default:
          break;
      }
    }

  }

}
