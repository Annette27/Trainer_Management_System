import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-viewallocation',
  templateUrl: './viewallocation.component.html',
  styleUrls: ['./viewallocation.component.css']
})
export class ViewallocationComponent implements OnInit {

  allocate = {
    name: '',
    id:'',
    type:'',
    course:'',
    startdate:'',
    enddate:'',
    time:'',
    courseid:'',
    batch:'',
    venue:'',
        }
  constructor(private profservice:ProfileService,private router:Router, public authservice:AuthService) { }

  ngOnInit(): void {
       this.profservice.UserAlloc(localStorage.getItem('foralloc')).subscribe(res=>{
      if((JSON.parse(JSON.stringify(res)).error)=="No Allocations to view"){
        alert("No Allocations to view")
        this.router.navigate(['empty'])
      }
      else{
        this.allocate=(JSON.parse(JSON.stringify(res))).data
      }
      
    })
    
  }
}
