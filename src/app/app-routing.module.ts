import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAmountComponent } from './add-amount/add-amount.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AmmountTablesComponent } from './ammount-tables/ammount-tables.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChartsComponent } from './charts/charts.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ForgotPasswordComponentComponent } from './forgot-password-component/forgot-password-component.component';

import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuardService } from './servicees/auth-guard.service';

const routes: Routes = [
  // {path:'',component:HomeScreenComponent},
 

{path:'LoginComponent',component:LoginComponentComponent},
{path:'RegisterComponent',component:RegisterComponentComponent},

{path:'ForgotPasswordComponent',component:ForgotPasswordComponentComponent},
{path:'resetPassword',component:ResetPasswordComponent},
{path : '' , redirectTo : '/LoginComponent' , pathMatch : 'full'},




{
  path: '',
  canActivate: [AuthGuardService],
  children: [
    {path:'HomeComponent',component:HomeScreenComponent},
    {path:'ProfileComponent',component:ProfileSettingsComponent},
    {path:'addImage',component:AddImageComponent},
    {path:'ChangeComponent',component:ChangePasswordComponent},
    {path:'EditProfile',component:EditProfileComponent},
    {path:'EditCategory',component:EditCategoryComponent},
    {path:'addAmmount',component:AddAmountComponent},
    {path:'ammountTable',component:AmmountTablesComponent},
    {path:'charts',component:ChartsComponent}
   
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents=[LoginComponentComponent,RegisterComponentComponent,ForgotPasswordComponentComponent]
