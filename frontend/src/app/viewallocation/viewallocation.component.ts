import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AllocationModel } from '../models/allocation';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-viewallocation',
  templateUrl: './viewallocation.component.html',
  styleUrls: ['./viewallocation.component.css']
})
export class ViewallocationComponent implements OnInit {

   allocations:AllocationModel[]=[];
  constructor(private profservice:ProfileService,private router:Router, public authservice:AuthService) { }

  ngOnInit(): void {
       this.profservice.UserAlloc(localStorage.getItem('foralloc')).subscribe(res=>{
      if((JSON.parse(JSON.stringify(res)).error)=="No Allocations to view"){
        alert("No Allocations to view")
        // this.router.navigate(['empty'])
      }
      else{
        this.allocations=(JSON.parse(JSON.stringify(res))).data
        console.log(this.allocations)
      }
      
    })
    
  }
}
