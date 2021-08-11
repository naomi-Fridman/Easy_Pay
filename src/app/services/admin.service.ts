import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Deposit } from '../models/Deposit';
import { Loan } from '../models/Loan';
import { Payment } from '../models/Payment';
import { Depositor } from '../models/Depositor';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) {
  }
  
  
  
  // updateDepositor(deposit:Deposit,user:User):Observable<void>{
  //   return this._http.put<void>("/api/DepositAccount?deposit=",deposit+"&user"+user)
  // }
 
}
