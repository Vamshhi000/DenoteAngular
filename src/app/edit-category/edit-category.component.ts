import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  myimg:string ="assets/images/logo.png";


  
  userform:FormGroup;
  user:User;
  iserror:boolean=false
  isSucuess:Boolean;
  
  liist:Object[]=[];
  name:string;
  
  email:string

  selectedFile: File;

 

  message: string;


  
  constructor(
    
    private httpClient : HttpClient,private fb:FormBuilder,private router:Router,private  authservice:AuthenticationServiceService,
    private commonsubject:CommonSubjectService
  ) { }
  
  ngOnInit(): void {
  
    this.userform=this.fb.group({
       
  
        title:['',[Validators.required]]
  
      })
  this.bindData();
this.getnamefromhome();
this.commonsubject.usersob$.subscribe((res)=>{
  this.email=res.email;
},(err)=>{
console.log(err)
})
  }
  
  
  getnamefromhome(){
    this.commonsubject.namesob$.subscribe((res)=>{
this.name=res;
console.log(res);
    },(err)=>{
      console.log(err);
    })
  }

  public onFileChanged(event) {
    console.log(event)
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.userform.get('title').value)
  }


  onUpload(){

        const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile, this.userform.get('title').value);
    this.authservice.editcatagory(uploadImageData,this.name,this.email).subscribe((res:any)=>{
          this.iserror=true;
          this.isSucuess=true;
          this.message=res.msg;
          console.log(res);
          setTimeout(()=>{this.iserror=false},4000);
          setTimeout(()=>{this.router.navigate(['/HomeComponent'])},1000);
    },(err:any)=>{
           console.log(err);
           this.iserror=true;
           this.isSucuess=false;
     this.message=err.error.msg;
  setTimeout(()=>{this.iserror=false},5000);
    });
  }
  bindData(){
    this.commonsubject.usersob$.subscribe((res)=>{
      this.user=res;
    })
  }

}
