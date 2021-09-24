import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { NotesService } from '../../service/notes.service';
import { ActivatedRoute } from '@angular/router';
import { Notes } from '../../models/notes';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'notes-newnotes',
  templateUrl: './newnotes.component.html',
  styleUrls: ['./newnotes.component.scss']
})
export class NewnotesComponent implements OnInit,OnDestroy {

  color ="#808080"
  isupdatemode = false;
  form!: FormGroup;
  id = 0;
  data:Notes ={};
  constructor(private formbuilder: FormBuilder,
    private router:Router,
              private notesService:NotesService,
              private messageService:MessageService,
              private routes :ActivatedRoute) { }
              
              
  $endsub : Subject<any> = new Subject();
  noteslist:Notes[] = [];
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      header : ['',Validators.required],
      note:['',Validators.required],
      color:['#bfbfbf',Validators.required],
    });
    this._checkupdtae();
    this._getdata();
  }

  ngOnDestroy() {
    this.$endsub.next();
    this.$endsub.complete();
  }

  private _checkupdtae(){
    this.routes.params.subscribe(params => {
      if(params.id){
        this.isupdatemode=true;
        this.id = params.id;
        
      }
    })
  }

  private _getdata(){
    if(this.isupdatemode){
      const udata = localStorage.getItem('userdata');
      const userId:{id:string} = JSON.parse(String(udata));
      this.notesService.getnotes(userId).pipe(takeUntil(this.$endsub)).subscribe((data) => {
        this.noteslist = data[0].notes;
        const l = this.noteslist.length;
        for(let i = 0; i < l; i++) {
          if(i == this.id){
            this.data = this.noteslist[i];
          }
        }
        this.form.controls.header.setValue(this.data.headers);
        this.form.controls.color.setValue(this.data.color);
        this.form.controls.note.setValue(this.data.notes);
      })
    }
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    else{
      if(this.isupdatemode){

        const udata = localStorage.getItem('userdata');
        const userdata:{id:string} = JSON.parse(String(udata));
        
        this.notesService.updatenotes({
          headers : this.form.controls.header.value,
          notes : this.form.controls.note.value,
          color : this.form.controls.color.value,
          key : this.id,
          id : userdata.id
        }).pipe(takeUntil(this.$endsub)).subscribe(() => {
          
            this.messageService.add({severity:'success', summary: 'Success', detail: "Note is Updated"});
            timer(1000).toPromise().then(() =>{this.router.navigate(['/']);})},
        (err)=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: `${err}`});}
        ) 
      }
      else{
        const udata = localStorage.getItem('userdata');
        const userdata:{id:string} = JSON.parse(String(udata));
        const data = {
          headers : this.form.controls.header.value,
          notes : this.form.controls.note.value,
          color : this.form.controls.color.value,
          id:userdata.id
        }
        
        this.notesService.postnotes(data).pipe(takeUntil(this.$endsub)).subscribe(() =>{
          this.messageService.add({severity:'success', summary: 'Success', detail: "Note is added"});
          timer(1000).toPromise().then(() =>{
            this.router.navigate(['/']);
          })
        },
        (err)=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: `${err}`});
        })
        
      }
    }
  }

}
