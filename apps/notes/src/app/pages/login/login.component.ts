import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { AuthserviceService } from '../../service/authservice.service';

@Component({
  selector: 'notes-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  iserror= false;
  message=""
  form!: FormGroup;
  constructor(private formbuilder: FormBuilder,private router:Router,private auth:AuthserviceService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }else{
      const data ={
        email:this.form.controls.email.value,
        password:this.form.controls.password.value
      }
      
      this.auth.checkuser(data).subscribe(data =>{
        this.iserror=data.Success;  
        if(!this.iserror){
          this.messageService.add({severity:'error', summary: 'Error', detail: data.Message});
        }else{
          localStorage.setItem('userdata',JSON.stringify({id:data.Userdata[0]._id}));
          timer(1000).toPromise().then(() =>{
            this.router.navigate(['']);
          })
        }
      })
    }
  }

  signin(){
    this.router.navigate(['/signin']);
  }

}
