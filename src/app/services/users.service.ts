import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposit } from 'src/app/models/Deposit';
import { User } from 'src/app/models/User';
import { DTO_userParms } from 'src/app/models/DTO_userParms';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private _http: HttpClient) { }
  getUserById(userId: number): Observable<User> {
    return this._http.get<User>("/api/User/" + userId);
  }
  deleteUser(userId: number): Observable<void> {
    return this._http.put<void>("/api/User/", userId);
  }
  updateUser(updateduser: User): Observable<User> {
    return this._http.put<User>("/api/User/", updateduser);
  }
  // getAllUsers():Observable< User[]>{
  //   return this._http.get<User[]>("/api/User");
  //   }
  getUserByIdentityNumber(identityNumber:number): Observable<User> {
    return this._http.get<User>("/api/User/getUserByIdentityNumber/" + identityNumber);
  }
  getAllUsers(dtoUserParms: DTO_userParms): Observable<User[]> {
    var temp;
    //const dtoUserUserParmsListString=new Array(dtoUser.firstName,dtoUser.lastName,dtoUser.address,dtoUser.city) 
    //const dtoUserUserParmsListNumber:Number[]=new Array(dtoUser.identityNumber,dtoUser.tellephoneNumber1,dtoUser.tellephoneNumber2) 
    //dtoUserUserParmsListString.forEach(element=>{
 
    if (dtoUserParms.firstName == "")
      dtoUserParms.firstName = null;
    if (dtoUserParms.lastName == "")
      dtoUserParms.lastName = null;
    if (dtoUserParms.address == "")
      dtoUserParms.lastName = null;
    if (dtoUserParms.city == "")
      dtoUserParms.lastName = null;

    return this._http.post<User[]>("/api/User", dtoUserParms);
  }
  getAddress(text):Observable<Array<string>>{
    return this._http.get<Array<string>>("/api/User/getAddress/"+JSON.stringify(text));
  }
  postUser(newUser:User):Observable<number>{
    return this._http.post<number>("/api/User/newUser", newUser);
  }
}






