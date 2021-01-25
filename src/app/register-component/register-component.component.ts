

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customvalidators } from '../customvalidator/Customvalidator';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit,OnChanges {

  constructor(private fb:FormBuilder,private authservice:AuthenticationServiceService,private router:Router) { }
userform:FormGroup;
user:User;
isSucuess:boolean;
message:String;
diserror:Boolean=false;
myimg:string ="assets/images/logo.png";
  ngOnInit(): void {
//errors method is used to validate validators in the userform object
    this.userform=this.fb.group({
      fullName:['',[Validators.required,Validators.maxLength(30),Validators.minLength(5)]],
      email:['',[Validators.required,Customvalidators.emailValidator]],
      password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]],
      reenterPassword:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]]
    })
    

// this.userform.get('email').setValue(this.user.email);
// this.userform.get('password').setValue(this.user.password);


  }
  ngOnChanges():void{

  }


register(){
this.authservice.register(this.userform.value).subscribe(
  (res:User)=>{
    this.isSucuess=true;
    this.diserror=true;
    setTimeout(()=>{this.diserror=false},5000);
    this.message=res.msg;
console.log(res);
setTimeout(()=>{this.router.navigate(['/LoginComponent'])},2000);

  },
  (error:any)=>{
  // console.log(error.status);//it displays ststus

this.message=error.error.msg;
 
    this.isSucuess=false;
    this.diserror=true;
    setTimeout(()=>{this.diserror=false},5000);
    // this.message='This email is already get registered!';
    
  }

);
}
// check(){
//   this.isSucuess=true;

// }


}
