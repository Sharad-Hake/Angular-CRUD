import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  userName: String="";
password :String="";

submit(){
  alert("user name is " + this.userName +" and password is "+ this.password +"!!" )
}
}
