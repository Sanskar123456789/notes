import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import { NotepageComponent } from './pages/notepage/notepage.component';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewnotesComponent } from './pages/newnotes/newnotes.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ColorPickerModule} from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { AuthGuardService } from './service/auth-guard.service';
const UI = [
  ToastModule,
  CardModule,
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  PanelModule,
  BrowserAnimationsModule,
  InputTextModule,
  InputTextareaModule,
  ColorPickerModule,
  ReactiveFormsModule,
  FormsModule
]

const routes: Routes = [

  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'signin',
    component:SigninComponent
  },
  {
    path:'',
    component:HomePageComponent,
  },
  {
    path:'createnotes',
    canActivate:[AuthGuardService],
    component:NotepageComponent
  },
  {
    path: 'newnotes',
    canActivate:[AuthGuardService],
    component:NewnotesComponent
  },
  {
    path: 'update/:id',
    canActivate:[AuthGuardService],
    component:NewnotesComponent
  }
]



@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomePageComponent, NotepageComponent, NewnotesComponent, LoginComponent,SigninComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),...UI,HttpClientModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
