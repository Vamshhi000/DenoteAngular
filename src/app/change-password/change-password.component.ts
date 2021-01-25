import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customvalidators } from '../customvalidator/Customvalidator';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


constructor(private router:Router,private fb:FormBuilder,private authservice:AuthenticationServiceService,private commonsubject:CommonSubjectService) { }

  myimg:string ="assets/images/logo.png";
  userform:FormGroup;
  
  isSucuess:boolean;
  message:String;
  diserror:boolean=false;
  user:User;

  ngOnInit(): void {
    this.userform=this.fb.group({
      password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]],
      newPassword:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]],
      confirmNewPassword:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]]
      
    })
  this.bindData();
  console.log(this.eemail);
  }


eemail:string;

 
changePassword(){
  this.authservice.changepassword(this.userform.value,this.eemail).subscribe((res:User)=>{
     
    this.isSucuess=true;
    this.diserror=true;
    setTimeout(()=>{this.diserror=false},5000);
    this.message=res.msg;


setTimeout(()=>{this.router.navigate(['/HomeComponent'])},2000);

  },
  (error:any)=>{
  // console.log(error.status);//it displays ststus

this.message=error.error.msg;
 
    this.isSucuess=false;
    this.diserror=true;
    setTimeout(()=>{this.diserror=false},5000);

    
  }
);
}


    bindData(){
      this.commonsubject.usersob$.subscribe((res)=>{
        this.user=res;
        this.eemail=res.email;
      })
    }

    logout(){
      localStorage.clear();
      this.router.navigate(['/LoginComponent']);
    }
}

