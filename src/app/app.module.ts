import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './login-component/login-component.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponentComponent } from './register-component/register-component.component';
import {HttpClientModule} from '@angular/common/http';
import { ForgotPasswordComponentComponent } from './forgot-password-component/forgot-password-component.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddImageComponent } from './add-image/add-image.component'
import {MatDialogModule} from '@angular/material/dialog';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import {MatDividerModule} from '@angular/material/divider';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddAmountComponent } from './add-amount/add-amount.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { AmmountTablesComponent } from './ammount-tables/ammount-tables.component';

import {MatTableModule} from '@angular/material/table';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { EditAmmountTableComponent } from './edit-ammount-table/edit-ammount-table.component';
import { ChartsModule } from 'ng2-charts';

import { ChartsComponent } from './charts/charts.component';   



@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    ForgotPasswordComponentComponent,
    ResetPasswordComponent,
    HomeScreenComponent,
    AddImageComponent,
    ProfileSettingsComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    EditCategoryComponent,
    AddAmountComponent,
    CreateTagComponent,
    AmmountTablesComponent,
 
    ConfirmDeleteComponent,
    EditAmmountTableComponent,
    ChartsComponent,

  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatFormFieldModule,
    
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
   
    
    
    
    
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
