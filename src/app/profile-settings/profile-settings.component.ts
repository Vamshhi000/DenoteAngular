import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AddImageComponent } from '../add-image/add-image.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { User } from '../models/form';


import {Images} from '../models/image';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {


  constructor(private router:Router, private commonsubject:CommonSubjectService) {
   
   }

  user:User;
  myimg:string ="assets/images/logo.png";

  ngOnInit(): void {
this. bindData();
  }
  editprofile(){
    this.router.navigate(['/EditProfile']);
  }
  bindData(){
    this.commonsubject.usersob$.subscribe((res)=>{
      this.user=res;
    })
  }

}
