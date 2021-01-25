import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditAmmountTableComponent } from '../edit-ammount-table/edit-ammount-table.component';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';






export interface DialogData {
  animal: string;
  name: string;
}










@Component({
  selector: 'app-ammount-tables',
  templateUrl: './ammount-tables.component.html',
  styleUrls: ['./ammount-tables.component.css']
})
export class AmmountTablesComponent implements OnInit {

  constructor(private authservice:AuthenticationServiceService,
    private commonsubject:CommonSubjectService,private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.bindData();
    this.getallammountdata();
   this.x;
  }











  titleAndAmmount:User[]=[];
  titleAndAmmountObject:User[]=[];
  myimg:string ="assets/images/logo.png";
  ammount:User[]=[];
  ammountMap=new Map();

  user:User;
  // names:string[]=[];
  names=new Set();
  email:string;
  x:number=0;
tagname:string;
// xxx:User[]=[];
  
  bindData(){
    this.commonsubject.usersob$.subscribe((res)=>{
      this.user=res;
      this.email=res.email;
    })
  }
    dataManuplator(result:any){
      this.x=0;
this.names.clear();
this.ammountMap.clear();

      this.titleAndAmmountObject=result;
      this.titleAndAmmountObject.forEach((p)=>{this.names.add(p.name)});



for(var data of this.names){


this.ammount= this.titleAndAmmountObject.filter(obj=>obj.name==data);
let c:number=0;
let userrr=new User()
this.ammount.forEach((ammount)=>{c+=ammount.ammount})
console.log(c);
this.x+=c;
userrr.total=c;

this.ammount.push(userrr);

this.ammountMap.set(data,this.ammount);




}
    }
  getallammountdata(){
    this.authservice.getAmmount(this.email).subscribe((res:any)=>{

      this.dataManuplator(res);

    },(err)=>{console.log(err)})
  }



  logout(){
    localStorage.clear();
    this.router.navigate(['/LoginComponent']);
  }


  deleteTag(tagName:string): void{
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {tagname:tagName,email:this.email}
    });

    dialogRef.afterClosed().subscribe((result) => {
if(result!=undefined){
  this.dataManuplator(result);
  console.log(this.ammountMap);
  
      
        // this.x;
}



      
      
    });
  }


  editTag(name:string,tagName:string): void{
    console.log(tagName);
    localStorage.setItem("tag",JSON.stringify(name));
    const dialogRef = this.dialog.open(EditAmmountTableComponent, {
      width: '400px',
      data: {email:this.email,name:name,tagName:tagName}
      
    });

    dialogRef.afterClosed().subscribe((result) => {
if(result!=undefined){
  this.dataManuplator(result);
  console.log(this.ammountMap);
  
      
        // this.x;
}



      
      
    });


  }
  
  }
