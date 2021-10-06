import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    uname:'',
    password:''
  };
  constructor() { }

  ngOnInit(): void {
  }
  userVerify(){
     alert("hi")
  }
}
