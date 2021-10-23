import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-trainerprofile',
  templateUrl: './trainerprofile.component.html',
  styleUrls: ['./trainerprofile.component.css']
})
export class TrainerprofileComponent implements OnInit {

  Profile={
    name:'',
    email:'',
     phone:'',
     address:'',
     highestQualification:'',
     skillSet:'',
     companyName:'',
     designation:'',
     course:'',
    image:'',
    imagepath:'',
    id:''
   }

  constructor(private profservice:ProfileService,private router:Router, public authservice:AuthService) {}
pro = localStorage.getItem('data');
  ngOnInit(): void {
    //console.log(localStorage.getItem('data'))
    this.profservice.logiUser(localStorage.getItem('data')).subscribe((data)=>{
      // console.log(data)
      this.Profile=JSON.parse(JSON.stringify(data));
      
    })
    
  }
 
  


  editProfile(Profile:any)
  {
    localStorage.setItem("editProfileId", Profile._id.toString());
    this.router.navigate(['update']);

  }
  logoutuser(){
    localStorage.removeItem('token1')
    localStorage.removeItem('data')
    this.router.navigate([''])
  
  }
}
