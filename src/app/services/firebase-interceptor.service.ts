import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseInterceptorService {

  constructor(private firebase: FirebaseService, auth: AuthService, afauth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log("Firebase Intercerptor");
    
    const urlFirebase = `https://proyectoangular-1d854-default-rtdb.firebaseio.com`;
  
    // const httpsReq = req.clone({
    //   url: urlFirebase + req.url
    // });
  
    return next.handle(req);
  }

}