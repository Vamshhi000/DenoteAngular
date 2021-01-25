import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonSubjectService } from './servicees/common-subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'ednote';

  constructor(private router:Router, private commonsubject:CommonSubjectService){
    
  }
  getLocalStoragedata:any;
  ngOnInit(){

  // this.getLocalStoragedata=JSON.parse(localStorage.getItem("user"));
  // this.commonsubject.userSubject.next(this.getLocalStoragedata);
  // this.commonsubject.usersBeSubject.next(this.getLocalStoragedata);






   
  }
}
