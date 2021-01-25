import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<CreateTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private authservice:AuthenticationServiceService
    ,private commonsubject:CommonSubjectService) { }





  userform:FormGroup;
  
  isSucuess:boolean;
  message:String;
  diserror:boolean=false;
  user:User;
  name:string;
  ngOnInit(): void {
    this.userform=this.fb.group({
      tagName:['',[Validators.required]]

      
    })
    this.name=JSON.parse(localStorage.getItem("tag"));
    this.commonsubject.usersob$.subscribe((res)=>{
      this.user=res
    },(err)=>{
console.log(err)
    })
  }

  save(){
    console.log(this.name);
this.authservice.saveTag(this.userform.value,this.name,this.user.email).subscribe((res)=>{
  // this.commonsubject.nameBeSubject.next("New tag is Sucussfully Created")
this.dialogRef.close("New tag is Sucussfully Created");
    },(err)=>{
      
    //  this.commonsubject.nameBeSubject.next("This tag is already exists")
     this.dialogRef.close("This tag is already exists");
      // this.message=error.error.msg;
 

    });
  }

}
