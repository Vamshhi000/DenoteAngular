import {FormControl, Validators} from '@angular/forms'



export class Customvalidators implements Validators{

    static emailValidator(control:FormControl){
      const email:String=control.value;
      const index:number=email.lastIndexOf('@');
      const domain:String=email.substring(index+1,email.length);

      const invalidemail=false;
    //   console.log(domain!=='gmail.com'||'@yahoo.com'||'@outlook.com');
      
      if(domain!=='gmail.com'){
         if(domain!=='yahoo.com'){
             if(domain!=='outlook.com'){
                return{
                    invalidemail:true
                 }
             }
         }
      }

      return invalidemail;
    }

    static phoneNumberValidator(control:FormControl){
let invalidNumber=false;
      if(isNaN(Number(control.value))){

return{

  invalidNumber:true,
 
}

      }
// return {
//   invalidNumber:false
// }
return invalidNumber;
    }






}







