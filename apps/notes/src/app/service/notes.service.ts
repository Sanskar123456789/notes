import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

   // api = "http://localhost:3000/notes/data/users" development api
   api ="https://e-notesback.herokuapp.com/notes/data/users";
   // production one ^
  constructor(private http : HttpClient) { }

  postnotes(notes:{headers: string,id: string,notes: string,color: string}):Observable<any> {
    return this.http.post(`${this.api}/addnotes`,notes)
  }

  getnotes(id:{id:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/getnotes`,id);
  }

  updatenotes(data:{headers:string , notes:string ,color: string , id: string , key: number}):Observable<any>{
    return this.http.put<any>(`${this.api}/updatenotes`,data);
  }

  deletenotes(data:{key: number,id: string}):Observable<any>{
    return this.http.put<any>(`${this.api}/removeNote`,data);
  }
}
