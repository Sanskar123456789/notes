import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotesService } from '../../service/notes.service';
import { Notes } from '../../models/notes';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'notes-notepage',
  templateUrl: './notepage.component.html',
  styleUrls: ['./notepage.component.scss']
})
export class NotepageComponent implements OnInit,OnDestroy {
  
  id = 0; 
  $endsub : Subject<any> = new Subject();
  noteslist:Notes[] = [];
  constructor(private notesService:NotesService,private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this._getNotes();
  }

  ngOnDestroy(): void {
    this.$endsub.next();
    this.$endsub.complete();
  }
  
  private _getNotes() {
    const udata = localStorage.getItem('userdata');
    const userId:{id:string} = JSON.parse(String(udata));
    this.notesService.getnotes(userId).pipe(takeUntil(this.$endsub)).subscribe((data) => {
      this.noteslist = data[0].notes;
      const l = this.noteslist.length;
      for(let i = 0; i < l; i++) {
        this.noteslist[i].key = i;      
      }
    })
  }
  
  update(key: Notes){
    this.router.navigateByUrl(`update/${key.key}`);
  }


  deletenote(keys: Notes){ 
    const udata = localStorage.getItem('userdata');
    const userId:{id:string} = JSON.parse(String(udata));
    this.id = Number(keys.key);
    this.notesService.deletenotes({
      key : this.id,
      id :userId.id
    }).pipe(takeUntil(this.$endsub)).subscribe((data) => {
      console.log(data);
      this.messageService.add({severity:'success', summary: 'Success', detail: "Note is deleted"});
          timer(1000).toPromise().then(() =>{
            this._getNotes();
          })
        },
        (err)=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: `${err}`});
        })
  }
}