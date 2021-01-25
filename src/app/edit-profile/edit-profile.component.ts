import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customvalidators } from '../customvalidator/Customvalidator';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private authservice:AuthenticationServiceService,private commonsubject:CommonSubjectService) { }
  currentValue:string="hgfsdgfifbkb";
  sgs:string='vamsi';
  myimg:string ="assets/images/logo.png";
  userform:FormGroup;
  startDate = new Date(1990, 0, 1);
  isSucuess:boolean;
  message:String;
  diserror:boolean=false;
  user:User;
  getLocalStoragedata:any;
  ngOnInit(): void {
    this.userform=this.fb.group({
      fullName:['',[Validators.required,Validators.maxLength(30),Validators.minLength(5)]],
   
      phoneNumber:['',[Validators.required,Customvalidators.phoneNumberValidator,Validators.minLength(10),Validators.maxLength(10)]],

      gender:['',Validators.required],
      dob:['',[Validators.required]],
      
    })
  this.bindData();
  }
  editprofile(){
    this.router.navigate(['/EditProfile']);
  }

eemail:string;

  save(){
    this.authservice.saveProfile(this.userform.value,this.eemail).subscribe(
      (res:User)=>{
        localStorage.setItem("user",JSON.stringify(res));
        this.getLocalStoragedata=JSON.parse(localStorage.getItem("user"));
        this.commonsubject.userSubject.next(this.getLocalStoragedata);
        this.commonsubject.usersBeSubject.next(this.getLocalStoragedata);
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
    logout(){
      localStorage.clear();
      this.router.navigate(['/LoginComponent']);
    }


    bindData(){
      this.commonsubject.usersob$.subscribe((res)=>{
        this.user=res;
        this.eemail=res.email;
      })
    }
}
