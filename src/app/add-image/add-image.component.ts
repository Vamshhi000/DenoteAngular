import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';



@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  myimg:string ="assets/images/logo.png";


  
  userform:FormGroup;
  user:User;
  iserror:boolean=false
  isSucuess:Boolean;
  email:string;
  liist:Object[]=[];
  
  
  

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
    this.authservice.uploadImage(uploadImageData,this.email).subscribe((res:any)=>{
          this.iserror=true;
          this.isSucuess=true;
          this.message=res.msg;
          console.log(res);
          setTimeout(()=>{this.iserror=false},4000);
          setTimeout(()=>{this.router.navigate(['/HomeComponent'])},1000);
    },(err:any)=>{
       
           this.iserror=true;
           this.isSucuess=false;
     this.message=err.error.msg;
  setTimeout(()=>{this.iserror=false},5000);
    });
  }
  bindData(){
    this.commonsubject.usersob$.subscribe((res)=>{
      this.user=res;
      this.email=res.email;
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/LoginComponent']);
  }
}
