import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  title:string="UPDATE PROFILE";
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
  constructor(private profilservice:ProfileService,private router:Router) { }

  ngOnInit(): void {
    let ProfileId = localStorage.getItem("editProfileId");
    this.profilservice.logiUser(ProfileId).subscribe((data)=>{
      this.Profile=JSON.parse(JSON.stringify(data));

  })

}

images:any
filename:string
url: any = undefined;

submitImage(event:any){
  this.images=event.target.files[0]
  this.filename = this.images.name;
  const reader = new FileReader();
  reader.readAsDataURL(this.images);
  reader.onload = (_event) => {
    this.url = reader.result;
     }
}
editProfile()
{    
  this.Profile.imagepath=this.url;
  this.Profile.image=this.filename;

  this.profilservice.editProfile(this.Profile);   
  alert("Success");
  this.router.navigate(['profile']);
}
}