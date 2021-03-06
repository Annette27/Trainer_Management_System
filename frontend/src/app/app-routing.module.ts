import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { ApproveComponent } from './approve/approve.component';
import { TrainerlistComponent } from './trainerlist/trainerlist.component';
import { AddcoursesComponent } from './addcourses/addcourses.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AllocateComponent } from './allocate/allocate.component';
import { AllocationlistComponent } from './allocationlist/allocationlist.component';
import { ViewallocationComponent } from './viewallocation/viewallocation.component';

const routes: Routes = [{path:'', component:HomeComponent},
{path:'home', component:HomeComponent},
{path:'aboutus', component:AboutusComponent},
{path:'signup',component:SignupComponent},
{path:'login', component:LoginComponent},
{path:'approve', component:ApproveComponent,canActivate:[AuthGuard]},
{path:'trainers', component:TrainerlistComponent,canActivate:[AuthGuard]},
{path:'courses', component:AddcoursesComponent,canActivate:[AuthGuard]},
{path:'profile',component:TrainerprofileComponent},
{path:'update',component:UpdateprofileComponent},
{path:'allocate',component:AllocateComponent,canActivate:[AuthGuard]},
{path:'allocatelist',component:AllocationlistComponent,canActivate:[AuthGuard]},
{path:'viewalloc',component:ViewallocationComponent,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
