import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { IUser } from '../interfaces/i-user';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
    ) {
    /* Guardar datos de usuario en el almacenamiento local cuando se
    inicia sesión y configuración nula cuando se cierra la sesión */
    // this.afauth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //     console.log(localStorage.getItem('user'));
        
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  async register(email: string, password: string) {
    try {
      return await this.afauth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Llame a la función SendVerificaitonMail() cuando un nuevo usuario inicie sesión
          arriba y vuelve promesa */
          this.SendVerificationMail();
          //this.SetUserData(result.user);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afauth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verificar-cuenta']);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async login(email: string, password: string) {
    // try {
    //   return await this.afauth
    //     .signInWithEmailAndPassword(email, password)
    //     .then((result) => {
    //       console.log(result.user?.refreshToken);
          
    //       localStorage.setItem("uid", result!.user!.uid);

    //       localStorage.setItem("token", result!.user!.refreshToken);

    //       console.log(localStorage.getItem("uid"));
          

    //       this.ngZone.run(() => {
    //         this.router.navigate(['dashboard']);
    //       });
    //       this.SetUserData(result.user);
    //     })
    // } catch (err) {
    //   console.log("error en login: ", err);
    //   return null;
    // }
    
    try {
      const auth = getAuth();
      const token = await signInWithEmailAndPassword(auth, email, password);
      const array = await token.user.getIdToken();
      localStorage.setItem("uid", token.user.uid);
      localStorage.setItem("token", array);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
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

    // try {
    //   return await this.afauth
    //     .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // } catch (err) {
    //   console.log("error en login con google: ", err);
    //   return null;
    // }
  }

  async AuthLogin(provider: any) {
    return this.afauth
      .signInWithPopup(provider)
      .then((result) => {

        //localStorage.setItem("user", result!.user.email | null);
        
        //console.log(result.user?.email);
        
        const array = result!.user!.getIdToken();
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


      // try {
      //   const auth = getAuth();
      //   const token = this.afauth.signInWithPopup(auth, provider);
      //   const array = await token.user.getIdToken();
      //   localStorage.setItem("uid", token.user.uid);
      //   localStorage.setItem("token", array);
      //   this.ngZone.run(() => {
      //     this.router.navigate(['dashboard']);
      //   });
      // } catch (error) {
      //   console.log(error);      
      // }

  }

  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: IUser = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  logout() {
    return this.afauth.signOut().then(() => {
      //localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      this.router.navigate(['login']);
    });
  }

}
