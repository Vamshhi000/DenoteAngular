import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddImageComponent } from '../add-image/add-image.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { User } from '../models/form';


import {Images} from '../models/image';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

//constructor(private fb:FormBuilder) { }




userform:FormGroup;
user:User;
myimg:string ="assets/images/logo.png";
catagoryList:String[]=[]
liist:Object[]=[];

selectedFile: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;
message: string;
imageName: any;
name:String;
images:Images;
email:string;
constructor(
  
private httpClient : HttpClient,private fb:FormBuilder,private router:Router,private authservice:AuthenticationServiceService,
  private commonsubject:CommonSubjectService) { }

ngOnInit(): void {

  this.userform=this.fb.group({
     

      title:['',[Validators.required]]

    })

    this.bindData();
this.getallimages();


}
editimg(name:string){

this.commonsubject.nameBeSubject.next(name);
}



public onFileChanged(event) {
  console.log(event)

  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile);
  console.log(this.userform.get('title').value)
}


  getImage() {

  this.httpClient.get('http://localhost:7070/image/get/' + this.imageName)
    .subscribe(
      res => {
        console.log(res)
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
       

        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}

getallimages(){
  this.httpClient.get(`http://localhost:7070/image/${this.email}`)
  
  .subscribe(
    (res:Object[]) => {
      this.catagoryList.push("all categories");
      for(let a of res){
 
        this.retrieveResonse = a;
     
        this.name=this.retrieveResonse.name;
        this.catagoryList.push(this.name);
        // const num= this.name.lastIndexOf(".");
        // this.mainName=this.name.substring(0,num);
       const img=new Images();
     
      img.mainImage=this.retrieveResonse.picByte;
       img.name=this.name;
     
this.liist.push(img);

      }
this.commonsubject.catagoryBeSubject.next(this.catagoryList);
    }
  );
}




addCatogory() {
  this.router.navigate(['/addImage']);
}


getAllUserData(){

this.authservice.getUserData(this.email).subscribe(





)



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


sendimgname(name:string){
  localStorage.setItem("tag",JSON.stringify(name));
}
}




