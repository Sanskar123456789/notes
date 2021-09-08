import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'notes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ishomepage = true;

  constructor(private router: Router , private routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.ishomepage = true;
  }


  logout(){
    localStorage.removeItem("userdata");
    this.router.navigate(['/login']);
  }
  tonewnotes(){
    this.router.navigate(['/newnotes']);
    this.ishomepage=false;
  }

  toseenotes(){
    this.router.navigate(['/createnotes']);
    this.ishomepage=false;
  }

  homepage(){
    this.router.navigate(['/']);
    this.ishomepage = true;
  }

}
