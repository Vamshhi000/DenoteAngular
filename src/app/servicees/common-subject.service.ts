import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class CommonSubjectService implements OnInit{

  constructor() { }

  userSubject : Subject<User> = new Subject();
  userSubject$: Observable<User> = this.userSubject.asObservable();



  usersBeSubject = new BehaviorSubject<User>(null);
  usersob$ : Observable<User> = this.usersBeSubject.asObservable();

  nameBeSubject = new BehaviorSubject<string>(null);
  namesob$ : Observable<string> = this.nameBeSubject.asObservable();

  catagoryBeSubject = new BehaviorSubject<String[]>(null);
  catagorysob$ : Observable<String[]> = this.catagoryBeSubject.asObservable();





  
  ngOnInit(): void {



  }




}
