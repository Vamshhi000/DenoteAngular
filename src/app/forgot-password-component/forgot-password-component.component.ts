import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customvalidators } from '../customvalidator/Customvalidator';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { Route } from '@angular/compiler/src/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-forgot-password-component',
  templateUrl: './forgot-password-component.component.html',
  styleUrls: ['./forgot-password-component.component.css']
})
export class ForgotPasswordComponentComponent implements OnInit {

 
  constructor(private fb:FormBuilder,private authservice:AuthenticationServiceService) { }
userform:FormGroup;
user:User;
disCard:Boolean=true;
isSuccess:Boolean=false;
iserror:Boolean=false;


  ngOnInit(): void {

    this.userform=this.fb.group({
     
      email:['',[Validators.required,Customvalidators.emailValidator]]
      })
    this.userform.get('email').errors
 }

routes=[
  {path:'register'}

]

send(){

 this.authservice.sendEmail(this.userform.value).subscribe(
(res:User)=>{
  this.disCard=false;
  this.isSuccess=true;
  
},
(res)=>{
this.iserror=true;
setTimeout(()=>{this.iserror=false},5000);
}
 )
}

}
