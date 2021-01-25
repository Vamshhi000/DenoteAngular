import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private authservice:AuthenticationServiceService,private router:Router,private activatedRoute:ActivatedRoute) { }
  userform:FormGroup;
  user:User;
  tokenValue:string;
  discard:Boolean=true;
  ngOnInit(): void {
    this.userform=this.fb.group({
   
      password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]],
      reenterPassword:['',[Validators.required,Validators.maxLength(12),Validators.minLength(8)]]
    })
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.tokenValue = params.token;
      console.log(this.tokenValue);
    });
    
  }
  submit(){
   this.authservice.resetpassword(this.userform.value,this.tokenValue).subscribe(
     (res:User)=>{
       console.log(res);
       this.openSweetalert()
       this.discard=false;
     },
     (err)=>{
      console.log(err);
     
     }
   )
  }


openSweetalert(){
  Swal.fire({
    title: 'PASSWORD CHANGED!',
    text: 'Your password has been changed successfully!',
    icon: 'success',
    showCancelButton: false,
    confirmButtonText: 'Login',
  //refer npm sweetalert
  }).then((result) => {
    if (result.value) {
      this.router.navigate(['/LoginComponent']);

    } 
  })
}


}
