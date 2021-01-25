import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/form';


import { CommonSubjectService } from './common-subject.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService implements OnInit{

  constructor(private http:HttpClient,private commonsubject:CommonSubjectService) { }

baseUrl:String='http://localhost:7070/register'
imgurl:String='http://localhost:7070/image'
tagurl:String='http://localhost:7070/tag'
//   isAuthenticated=new BehaviorSubject<boolean>(false);
// isAuthenticated$:Observable<boolean> = this.isAuthenticated.asObservable();
isAuthenticated:boolean;
user:Observable<User>
ngOnInit(): void {
  let count=0;
console.log(++count);



}


verification(authvar:boolean){
  if(authvar!=null){
    this.isAuthenticated=authvar;
  }

}

register(user:User):Observable<User> {
 return this.http.post<User>(`${this.baseUrl}/registration`,user);
}
sendEmail(user:User):Observable<User>{
  // return this.http.post<User>(`${this.baseUrl}/emailVerification`,user);
  return this.http.post<User>('http://localhost:7070/register/emailVerification',user,);

}
resetpassword(user:User,token:String):Observable<User>{
  console.log(`${this.baseUrl}/resetPassword?token=${token}`);
  return this.http.post<User>(`${this.baseUrl}/resetPassword?token=${token}`,user,);
 
}



uploadImage(uploadImageData:FormData,email:string):Observable<any>{
 return this.http.post<any>(`${this.imgurl}/update/${email}`,uploadImageData);
  

}
editcatagory(uploadImageData:FormData,name:string,email:string):Observable<any>{
console.log(`${this.imgurl}/${name}`);
  return this.http.post<any>(`${this.imgurl}/${name}/${email}`,uploadImageData);
   
 
 }




saveProfile(user:User,email:string): Observable<User>{

  return this.http.put<User>(`${this.baseUrl}/saveProfile?email=${email}`,user);

}


Login(user:User):Observable<User>{

  // this.commonsubject.userSubject$.subscribe((res)=>{
  //   this.isAuthenticated=res.isAuthenticated;
  // })

this.user=this.http.get<User>(`${this.baseUrl}/${user.password}?email=${user.email}`);;
this.user.subscribe((res)=>{
  this.isAuthenticated=res.isAuthenticated;
})
  return this.http.get<User>(`${this.baseUrl}/${user.password}?email=${user.email}`);;




  
  
  
}



getUserData(email:string):Observable<User>{

  return this.http.get<User>(`${this.baseUrl}/UserData?email=${email}`);
}




changepassword(user:User,email:string):Observable<User>{
 return this.http.put<User>(`${this.baseUrl}/changePassword?email=${email}`,user)
}




saveTag(user:User,name:string,email:string):Observable<User>{
console.log(`${this.tagurl}/${name}`);

console.log(`http://localhost:7070/tag/${name}`);
return this.http.post<any>(`http://localhost:7070/tag/${name}?email=${email}`,user);
}


getalltags(name:string,email:string):Observable<User>{
  return this.http.get<any>(`http://localhost:7070/tag/${name}?email=${email}`);
}



saveAmmount(user:User,name:string,email:string):Observable<User>{
  return this.http.post<any>(`http://localhost:7070/Ammount/${name}?email=${email}`,user);
}


getAmmount(email:string):Observable<User>{
  return this.http.get<any>(`http://localhost:7070/Ammount?email=${email}`);
}


deleteAmmount(tagname:string,email:string):Observable<User>{
  return this.http.delete<any>(` http://localhost:7070/Ammount/${tagname}?email=${email}`)
}

updateAmmount(user:User,name:string,email:string,tagName:string):Observable<User>{
  return this.http.put<any>(`http://localhost:7070/Ammount/${name}/${tagName}?email=${email}`,user);
}

barchartData(name:string,email:string):Observable<any>{
  return this.http.get<any>(`http://localhost:7070/Ammount/${name}?email=${email}`);
}

pieChartData(reports:string,email:string):Observable<any>{
  return this.http.get<any>(` http://localhost:7070/Ammount/pie/${reports}?email=${email}`);
}
}
