import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {AllocationModel} from '../models/allocation'
import { Subscription } from 'rxjs';
import { ApplistService } from '../applist.service';
import{FilterSettingsModel} from '@syncfusion/ej2-angular-grids'
import {CommandModel,CommandClickEventArgs,GridComponent,Column,IRow,EditSettingsModel} from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocationlist',
  // templateUrl: './allocationlist.component.html',
  template:`
  <div margin-top=20 align='Center'  style= "background-image:url('../../assets/img/it.jpg'); background-color: rgba(0, 0, 0, 0.685);">
  <div class="trial" style=" color:white;">BATCH ALLOCATION LIST</div>
  <ejs-grid #grid [dataSource]="allocations" [filterSettings]='filterOptions' [allowFiltering]='true' [editSettings]='editSettings' (commandClick)='commandClick($event)' width=1200>
  <e-columns>

  <e-column  field='name' headerText='Name' textAlign='Center' width=50></e-column>
  <e-column  field='id' headerText='ID' textAlign='Center' width=50></e-column>
  <e-column field='course' headerText='Course' textAlign='Center' width=50></e-column>
  <e-column field='courseid' headerText='Course Id' textAlign='Center' width=50></e-column>
  <e-column field='batch' headerText='Batch' textAlign='Center' width=50></e-column>
  <e-column field='startdate' headerText='Start Date' textAlign='Center' width=50></e-column>
  <e-column field='enddate' headerText='End Date' textAlign='Center' width=50></e-column>
  <e-column field='time' headerText='time' textAlign='Center' width=50></e-column>
  <e-column field='venue' headerText='venue' textAlign='Center' width=50></e-column>
  <e-column headerText='Delete' width=50 [commands]='commands'></e-column>
 
   </e-columns>
    </ejs-grid>
  </div>
  `,
  styleUrls: ['./allocationlist.component.css']
})
export class AllocationlistComponent implements OnInit {

  public filterOptions:FilterSettingsModel={
    ignoreAccent:true,
    type:"Excel"
  }
  public editSettings:EditSettingsModel;
  public commands:CommandModel[];
  allocations:AllocationModel[];
  private appsSubscription : Subscription;
  constructor(private AppService :ApplistService, private router:Router) { }

  ngOnInit(): void {

    this.AppService.getAllocations();
    this.appsSubscription=this.AppService
    .getAllocationsStream()
    .subscribe((allocations:AllocationModel[])=>{
    this.allocations=allocations;
    })
    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.commands = [{ buttonOption: { content: 'DELETE', cssClass: 'e-flat' } }];
  }
  commandClick(args: CommandClickEventArgs): void {
    let id=JSON.parse(JSON.stringify(args.rowData))._id
    localStorage.setItem("deletealloc",id);
    this.AppService.deleteAllocation(id)
    .subscribe((data)=>{
      this.allocations=this.allocations.filter(p =>p !== args.rowData)
    })
    alert("Deleted")
  
  
}
}
