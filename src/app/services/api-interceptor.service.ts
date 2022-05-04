import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataValoresService } from './data-valores.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

  constructor(private dataValores: DataValoresService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log("API INTERCEPTOR");
    
    const apiKey = `&apiKey=eCI2fh7a4zipFKtXBhTX5zDvr_6V3whw`;

    let httpsReq;

    if(req.url.includes("polygon")) {
      httpsReq = req.clone({
        url: req.url + apiKey
      });
    } else {
      httpsReq = req.clone({
        url: req.url
      });
    }

    return next.handle(httpsReq);
  }
}