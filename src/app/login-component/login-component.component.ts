import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../models/form';
import {Customvalidators} from '../customvalidator/Customvalidator'
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { Router } from '@angular/router';
import { CommonSubjectService } from '../servicees/common-subject.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit,OnChanges {

  constructor(private fb:FormBuilder,private authservice:AuthenticationServiceService,private router:Router,
    private commonsubject:CommonSubjectService) { }
userform:FormGroup;
user:User;
myimg:string ="assets/images/logo.png";
getLocalStoragedata:any;

isSucuess:boolean;
message:String;
diserror:boolean=false;
  ngOnInit(): void {

    this.userform=this.fb.group({
     
      email:['',[Validators.required,Customvalidators.emailValidator]],
      password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]]


      

    })
    this.userform.get('email').errors



this.getLocalStoragedata=JSON.parse(localStorage.getItem("user"));
this.authservice.verification(this.getLocalStoragedata.isAuthenticated);
this.commonsubject.userSubject.next(this.getLocalStoragedata);
this.commonsubject.usersBeSubject.next(this.getLocalStoragedata);
this.router.navigate(['/HomeComponent']);
  }
  ngOnChanges():void{

  }




routess=[
 
  {path:'RegisterComponent',displayname:"RegisterComponent"},
  {path:'ForgotPasswordComponent',displayname:"ForgotPasswordComponent"},
  {path:'resetPassword',displayname:"resetPassword"}
  
];


Login(){
this.authservice.Login(this.userform.value).subscribe(
  (res:User)=>{

localStorage.setItem("user",JSON.stringify(res));
this.getLocalStoragedata=JSON.parse(localStorage.getItem("user"));
this.commonsubject.userSubject.next(this.getLocalStoragedata);
this.commonsubject.usersBeSubject.next(this.getLocalStoragedata);



    this.router.navigate(['/HomeComponent']);
    
  },
  (err:any)=>{
    this.message=err.error.msg;
     
    this.isSucuess=false;
    this.diserror=true;
    setTimeout(()=>{this.diserror=false},5000);
  }
)
}


sub(observer){
 

}
}
