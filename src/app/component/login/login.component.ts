import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  login(){

    if(this.email == '') {
      alert('Preencha seu email!');
      return;
    }

    if(this.password == '') {
      alert('Preencha sua senha!');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
