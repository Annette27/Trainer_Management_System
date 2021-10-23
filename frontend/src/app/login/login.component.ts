import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
 userVerify(){
  this.authservice.loginUser(this.user)
  .subscribe(res=>{
    if(res.token){
    localStorage.setItem('token',res.token)
    
    this.router.navigate(['home'])
    alert("success")
    }
    if(res.token1){
      localStorage.setItem('token1',res.token1)
      localStorage.setItem('data',res.data._id)
      localStorage.setItem('foralloc',res.data.id)
      this.router.navigate(['home'])
      console.log("user");
    }
    else if(res.error=="Invalid User"){
      alert("Invalid User")
    }
   else  if(res.error=="Invalid password"){
      alert("Invalid Password")
    }
    
  })
 }
}

  