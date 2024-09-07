import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }


  // LOGIN 

  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token','true');
      if(res.user?.emailVerified == true) {
        this.router.navigate(['lista']);
      } else {
        this.router.navigate(['varify-email']);
      }
    }, err => {
      alert('Algo deu errado');
      this.router.navigate(['/login']);
    })
  }

  // LOGIN 

  // REGISTER 
  
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);
    }, err => {
      alert('Algo deu errado');
      this.router.navigate(['/register']);
    })
  }

  // REGISTER

  // LOGOUT

  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);    })
  }

  // LOGOUT

  // FORGOT PASSWORD

  forgotPassword(email : string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['varify-email']);
    }, err => {
      alert('Algo deu errado!');
    })
  }
  
  // FORGOT PASSWORD 

  // EMAIL VERIFICATION

  async sendEmailForVarification(user: any) {
    try {
      await user.sendEmailVerification();  
      this.router.navigate(['/varify-email']);
    } catch (err) {
      alert('Algo deu errado ao enviar o email de verificação!');
    }
  }

  // EMAIL VERIFICATION

  // SIGN IN WITH GOOGLE

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/lista']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

  // SIGN IN WITH GOOGLE

  // REDIRECT TO EDIT TASK

  redirectToEdit() {
    this.router.navigate(['/lista']);
  }

  // REDIRECT TO EDIT TASK
}
