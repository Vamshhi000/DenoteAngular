import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit,OnChanges {

  constructor(  public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private authservice:AuthenticationServiceService) { }

  ngOnInit(): void {
    console.log("eggggggggggfefe");
  }
  ngOnChanges():void{
    console.log("efefe")
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Delete(){
    console.log(this.data.tagname);
this.authservice.deleteAmmount(this.data.tagname,this.data.email).subscribe((res:any)=>{
  this.dialogRef.close(
    res
  );
  console.log(res)

},(err)=>{console.log(err)});

  }


}
