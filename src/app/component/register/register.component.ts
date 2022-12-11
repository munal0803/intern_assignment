import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public email : string = '';
  public password : string = '';
  constructor(private auth:AuthService){

  }
  ngOnInit() : void{
  }
  register(){
    if(this.email==''){
      alert('please enter the email');
      return;
    }
    if(this.password==''){
      alert('please enter the password');
      return;
    }
    this.auth.register(this.email,this.password);
    this.email='';
    this.password='';
  }
}
