import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  callbackValue=false;
  
  constructor(private router: Router,private user:AuthserviceService) { }
  canActivate(){
    
    const udata = localStorage.getItem('userdata');
    if(!udata){
      this.router.navigate(['login']);
    }
    else{
      const userdata:{id:string} = JSON.parse(String(udata));
      
      this.user.checkisuser(userdata).subscribe(res=>{
        if(res){
          this.callbackValue = true;
        }
      });

      return this.callbackValue;
    }
    this.router.navigate(['login']);
    return false;
  }
}
