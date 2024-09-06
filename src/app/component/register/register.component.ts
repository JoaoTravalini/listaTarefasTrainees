import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  register(){

    if(this.email == '') {
      alert('Preencha seu email!');
      return;
    }

    if(this.password == '') {
      alert('Preencha sua senha!');
      return;
    }

    this.auth.register(this.email,this.password);

    this.email = '';
    this.password = '';
  }
}
