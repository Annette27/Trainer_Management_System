import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private Http:HttpClient) { }
  logiUser(pro:any){
    return this.Http.get("http://localhost:3000/"+pro)
  }
  UserAlloc(pro:any){
    return this.Http.get("http://localhost:3000/viewalloc/"+pro)
  }
  editProfile(Profile:any)
  {
    console.log('client update')
    return this.Http.put("http://localhost:3000/update",Profile)
    .subscribe(data =>{console.log(data)})
  }
  // constructor(private Http:HttpClient) { }
  // getProfile(id:any){
  //   return this.Http.get("http://localhost:3000/"+id);
  // }
  // getProfile(Profile:any)
  // {
  //   console.log('client update')
  //   return this.Http.put("http://localhost:3000/update",Profile)
  //   .subscribe(data =>{console.log(data)})
  // }
}
