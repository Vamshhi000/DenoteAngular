import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CreateTagComponent } from '../create-tag/create-tag.component';
import { Customvalidators } from '../customvalidator/Customvalidator';

import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';

@Component({
  selector: 'app-edit-ammount-table',
  templateUrl: './edit-ammount-table.component.html',
  styleUrls: ['./edit-ammount-table.component.css']
})
export class EditAmmountTableComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditAmmountTableComponent>,private router:Router,private fb:FormBuilder,private authservice:AuthenticationServiceService,private commonsubject:CommonSubjectService
   ,@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog  ) {

  }

  userform:FormGroup;
  
  isSucuess:boolean;
  message:String;
  diserror:boolean=false;
  user:User;
  name:string;
  i:number=0;
 tagnamee:string;
  ngOnInit(): void {

    this.userform=this.fb.group({
      ammount:['',[Validators.required,Customvalidators.phoneNumberValidator]],
      tagName:['']
  
      
    })
  this.bindData();
  // this.name=JSON.parse(localStorage.getItem("tag"));
  this.tagnamee=this.data.tagName;
  this.name=this.data.name;
  this. getalltagsinammount()
  this.commonsubject.usersob$.subscribe((res)=>{
    this.user=res
  },(err)=>{
console.log(err)


console.log(this.tagnamee);
  })


  }
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
 
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  realFruit:string[]=[];
  allFruits: Object[]=[];
  fruitStore:string[]=[];
 tag:string;
 offtag:boolean=true;
ammount:number;


  openDialog(): void {

    const dialogRef = this.dialog.open(CreateTagComponent, {
      width: '400px',
      height:'200px',
      data: {name: this.name}
    });
    dialogRef.afterClosed().subscribe((res:any) => {
      if(res!=undefined){
        if(res=="New tag is Sucussfully Created"){
          this.isSucuess=true;
          this.diserror=true;
          setTimeout(()=>{this.diserror=false},5000);
          this.message=res
          this. getalltagsinammount(); 
        }else{
          this.message=res;
          this.isSucuess=false;
          this.diserror=true;
          setTimeout(()=>{this.diserror=false},5000);
        }
 
}

    },(err)=>{
        this.message="error";
        this.isSucuess=false;
        this.diserror=true;
        setTimeout(()=>{this.diserror=false},5000);
    });
    
  }








  remove(fruit: string): void {
    const index = this.allFruits.indexOf(fruit);

    if (index >= 0) {
      this.allFruits.splice(index, 1);
    }
  }


  removee(fruit: string): void {
    
    const index = this.realFruit.indexOf(fruit);
if(!this.allFruits.includes(fruit)){
  this.allFruits.push(fruit);
}
   

this.offtag=true;

    if (index >= 0) {
      this.realFruit.splice(index, 1);
    }
  }



  onnnnnnn(fruit){

   this.fruitStore.push(fruit);
    let index =this.fruitStore.indexOf(fruit);
    for(var i=index+1;i<=this.fruitStore.length;i++){
      if(this.fruitStore[i]==this.fruitStore[index]){
        index=i;
      }
    }
    if(index!=0 && !this.allFruits.includes(this.fruitStore[index-1])){
      this.allFruits.push(this.fruitStore[index-1]);

    }
 
    this.realFruit[0]=fruit;
    this.offtag=false;
    this.remove(fruit);
  }
  eemail:string;

 



    bindData(){
      this.commonsubject.usersob$.subscribe((res)=>{
        this.user=res;
        this.eemail=res.email;
      })
    }




    getalltagsinammount(){
      this.authservice.getalltags(this.name,this.eemail).subscribe((res:any)=>{
        this.allFruits=res
        
      },(err)=>{

      })

    }




    updateAmmount(){
     
      console.log(this.userform.get('tagName'));
      let x=Object.values(this.userform.value)[0];
this.ammount=Number(x);
      
for(var val of this.realFruit){
  this.tag= Object.values(val)[1];


  console.log(Object.values(val)[0]);
}


  this.userform.patchValue({
    ammount:this.ammount,
    tagName: this.tag

  });
  
  console.log(this.userform.get('tagName').value);
 
  if(this.userform.get('tagName').value!=undefined){
      this.authservice.updateAmmount(this.userform.value,this.name,this.user.email,this.tagnamee).subscribe((res:User)=>{
        // this.isSucuess=true;
        // this.diserror=true;
        // setTimeout(()=>{this.diserror=false},5000);
        // this.message=res.msg;
        this.dialogRef.close(
          res
        );
        
      },(err:any)=>{

        if(err.status==400){
          this.message="Edit on wrong column";
 
          this.isSucuess=false;
          this.diserror=true;
          setTimeout(()=>{this.diserror=false},5000);    
        }else{
          this.message="internal server error";
 
          this.isSucuess=false;
          this.diserror=true;
          setTimeout(()=>{this.diserror=false},5000);
        }

      })
    }else{
      this.message="Please add Tag";
 
        this.isSucuess=false;
        this.diserror=true;
        setTimeout(()=>{this.diserror=false},5000);
    }
  }

}
