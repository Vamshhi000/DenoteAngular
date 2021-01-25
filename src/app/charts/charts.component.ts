import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { User } from '../models/form';
import { AuthenticationServiceService } from '../servicees/authentication-service.service';
import { CommonSubjectService } from '../servicees/common-subject.service';


import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  constructor(private authservice:AuthenticationServiceService,private commonsubject:CommonSubjectService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  user:User;
  email:string;
  catagoryList:String[];
  category:string;
 xAxis:string[]=[];
 yAxis:number[]=[];
 pieXlist:string[]=[];
 pieYlist:number[]=[];
 llist:string[]=["Days reports","Weeks reports","Months reports","Annually reports"];
  updateAmmount:number;
  chartMap = new Map();  
  ngOnInit(): void {

    this.commonsubject.catagorysob$.subscribe((res:any)=>{
    
this.catagoryList=res
    },(err)=>{
      console.log(err);
    })
    this.commonsubject.usersob$.subscribe((res)=>{
      this.user=res
      this.email=this.user.email;
    },(err)=>{
  console.log(err)
    })
 


    this.getcatagory("all categories");
    this.getPieChartData("Days reports");

  }
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  // public barChartData: ChartDataSets[] = [];
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartLabels: Label[]=[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40]}

  ];




  

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // public pieChartLabels: Label[] = ['Download', 'In', 'Sales'];
  public pieChartLabels: Label[]=['example','example','example','example','example','example'];
  // public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartData: SingleDataSet=[1,2,3,4,5,6];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

getcatagory(catagory:string){
this.chartMap.clear();


console.log(this.chartMap);
this.category=catagory;
this.authservice.barchartData(this.category,this.email).subscribe((res:any)=>{
  console.log(res);
  for(var data of res){
   
    if(this.chartMap.get(data.weekDay)!=null){
      this.updateAmmount=this.chartMap.get(data.weekDay);
      this.updateAmmount+=data.ammount;
      this.chartMap.set(data.weekDay,this.updateAmmount);
    }else{
      this.chartMap.set(data.weekDay,data.ammount);
    }


  }
  console.log(this.chartMap);
  this.prepareChartData();

},(err)=>{
  console.log(err)
})
 }


 prepareChartData(){
this.xAxis=[];
this.yAxis=[];
  for (let [key, value] of this.chartMap) {
    this.xAxis.push(key);

    this.yAxis.push(value);
  
}
this.barChartLabels=[];
while(this.barChartData.length){
  this.barChartData.pop();
}


 this.barChartLabels=this.xAxis;
this.barChartData.push({data:this.yAxis, stack: 'a'})


 }

 getPieChartData(report:string){
   
  this.pieXlist=[];
  this.pieYlist=[];

    this.authservice.pieChartData(report,this.email).subscribe((res:any)=>{

      for(var x of res){
this.pieXlist.push(x.name);
this.pieYlist.push(x.total);

      }
this.pieChartLabels=this.pieXlist;
this.pieChartData=this.pieYlist;
    },(err)=>{
      console.log(err);
    })


 }
}
