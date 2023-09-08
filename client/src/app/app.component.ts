import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-finaktiva';
  readonly APIUrl = "http://localhost:4300/query";

  constructor(private http:HttpClient){
  }
  notes:any=[];

  refreshNotes(){
    this.http.get(this.APIUrl).subscribe(data=>{
      this.notes = data;
    })
  }
  ngOnInit(){
    this.refreshNotes();
  }
  queryMethod(){
    var queryVal = (<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData= new FormData();
    formData.append("newNotes", queryVal);
    this.http.post(this.APIUrl+"/methods", formData).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }
  
}
