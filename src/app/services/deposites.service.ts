import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposit } from 'src/app/models/Deposit';
import { Currency } from 'src/app/models/Currency';
import { Depositor } from '../models/Depositor';

@Injectable({
  providedIn: 'root'
})
export class DepositesService {

  constructor(private _http: HttpClient) { }
  postDeposite(newDeposite: Deposit): Observable<void> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this._http.post<void>("/api/Deposit",newDeposite );
  }
  getAllDeposits(): Observable<Deposit[]> {
    return this._http.get<Deposit[]>("/api/Deposit");
  }
  updateDepositor(updatedDepositor: Deposit): Observable<Deposit> {

    return this._http.put<Deposit>("/api/Deposit", updatedDepositor);
  }
  getcurrancyTypeByCurrancyId(currancyId: number): Observable<Currency> {
    return this._http.get<Currency>("/api/CurrencyType/" + currancyId);
  }
}