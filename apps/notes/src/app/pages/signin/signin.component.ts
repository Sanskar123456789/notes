import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthserviceService } from '../../service/authservice.service';
@Component({
  selector: 'notes-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit,OnDestroy {

  $endsub : Subject<any> = new Subject();
  form!: FormGroup;
  constructor(private formbuilder: FormBuilder,private router:Router,private authService:AuthserviceService,private messageService:MessageService) { }
  
  ngOnDestroy() {
    this.$endsub.next();
    this.$endsub.complete();
  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      name:['',Validators.required],
      phone:['']
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }else{
      const data ={
        email:this.form.controls.email.value,
        password:this.form.controls.password.value,
        name:this.form.controls.name.value,
        phone:this.form.controls.phone.value,
      }
      this.authService.postuser(data).pipe(takeUntil(this.$endsub)).subscribe(data =>{
        if(data.Success){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User Registered'});
          timer(2000).toPromise().then(() =>{
            this.router.navigate(['/login']);
          })
        }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: data.Message});
        }
      })
    }
  }



}
