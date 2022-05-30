import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    ) {}

  async register(email: string, password: string) {
    try {
      return await this.afauth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
          const array = result!.user!.getIdToken();
          localStorage.setItem("uid", result!.user!.uid);
          array.then(function(s) {     
            console.log(s);
            localStorage.setItem("token", s);
          });
          this.SendVerificationMail();
        })
        .catch((error) => {
          window.alert(error.message);
        });
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  SendVerificationMail() {
    return this.afauth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verificar-cuenta']);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async login(email: string, password: string) {    
    try {
      const auth = getAuth();
      const token = await signInWithEmailAndPassword(auth, email, password);
      const array = await token.user.getIdToken();
      localStorage.setItem("email", email);
      localStorage.setItem("uid", token.user.uid);
      localStorage.setItem("token", array);
      this.ngZone.run(() => {
        if ( localStorage.getItem("uid") == "M8KI8PFqr9WVuuBAFFIbHp34Uzf2" ) {
          this.router.navigate(['panel-admin']);
        } else {
          this.router.navigate(['dashboard']);
        }
      });
    } catch (error) {
      console.log(error);      
    }
  }

  async loginWithGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  async AuthLogin(provider: any) {
    return this.afauth
      .signInWithPopup(provider)
      .then((result) => {
        const array = result!.user!.getIdToken();
        localStorage.setItem("email", result!.user!.email!);
        localStorage.setItem("uid", result!.user!.uid);
        array.then(function(s) {          
          localStorage.setItem("token", s);
        });
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });

  }

  logout() {
    return this.afauth.signOut().then(() => {
      localStorage.removeItem("email");
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      this.router.navigate(['login']);
    });
  }

}
