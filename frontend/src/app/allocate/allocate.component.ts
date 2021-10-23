import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplistService } from '../applist.service';
import { BatchModel } from '../models/batch';
import { CourseModel } from '../models/courses';
import { NewapplistService } from '../newapplist.service';
import { faCoffee,faKey,faPhone,faEnvelope,faUserAlt,faMapMarkerAlt,faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {

 

  faCoffee = faCoffee;
  faKey=faKey;
  faPhone=faPhone;
  faEnvelope=faEnvelope;
  faUserAlt=faUserAlt;
  faMapMarkerAlt=faMapMarkerAlt;
  faUserGraduate=faUserGraduate;
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
    courses:CourseModel[]=[];
    batches:BatchModel[]=[];
    private courseSubscription : Subscription;
    private batchSubscription : Subscription;

    public noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }
   
imageData:string;
onselect(batch){
console.log(this.allocate.course)

  
this.batches= this.batches.filter(e=> e.courseid==batch.target.value);
}
  constructor(private fb:FormBuilder, private router:Router, private newAppList:NewapplistService,private AppService :ApplistService,private profservice:ProfileService) {}

    allocateForm =this.fb.group({
      startdate:new FormControl('',[Validators.required]),
      enddate:new FormControl('',[Validators.required]),
      time: new FormControl('',[Validators.required]),
      courseid: new FormControl('',[Validators.required]),
      batch : new FormControl('',[Validators.required]),
      venue: new FormControl('',[Validators.required,this.noWhitespaceValidator])
     
    }
    )
   
   get f (){
    return this.allocateForm.controls}
    
    newAllocation(){
      console.log(this.allocate)
      this.newAppList.newallocation(this.allocate)
      .subscribe((res)=>{
        if(res.error==='Trainer already allocated a batch'){
          alert("Trainer already allocated a batch");
         this.router.navigate(['trainers']);
    
        }
        else if(res.error==='batch allocated to another trainer'){
          alert("batch allocated to another trainer");
          // this.router.navigate(['trainers']);
    
        }
        else if(res.error==='new allocation'){
          alert("Allocation successfull");
          this.router.navigate(['trainers']);
    
        }
      })
    }

  ngOnInit(): void {
// this.newAppList.idNum().subscribe(res=>{
//   this.trainer.id=res.id
//   // console.log(res.id)
// })
console.log(localStorage.getItem('allocationId'))

this.AppService.getCourses();
this.courseSubscription=this.AppService
.getCoursesStream()
.subscribe((courses:CourseModel[])=>{
this.courses=courses;
console.log(this.courses)
})
this.AppService.getBatches();
this.batchSubscription=this.AppService
.getBatchesStream()
.subscribe((batches:BatchModel[])=>{
this.batches=batches;
console.log(this.batches)

})
this.profservice.logiUser(localStorage.getItem('allocationId')).subscribe((data)=>{console.log(data)
  console.log(JSON.parse(JSON.stringify(data)))
  this.allocate=JSON.parse(JSON.stringify(data));
  console.log(this.courses)
  console.log(this.allocate.course)
this.courses= this.courses.filter(e=>e.name==this.allocate.course)
  
})
  }


}
