import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/Loan';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {
  constructor(private _http: HttpClient) {
  }
  getUserFromServer(code:string,accessName:string):Observable<User>{
      return this._http.get<User>("/api/Login/"+code+"/"+accessName);
  }
  // addUser():Observable<
  // saveStudentInServer(student:Student):Observable<void>{
  //   return this._http.put<void>("/api/student",student)
  // }
}
