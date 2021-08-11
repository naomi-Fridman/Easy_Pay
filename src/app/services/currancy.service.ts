import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from 'src/app/models/Currency';
import { Observable } from 'rxjs';
import { API_Obj } from '../models/API_Obj';

@Injectable({
  providedIn: 'root'
})
export class CurrancyService {
  
  constructor(private _http: HttpClient) { }
  getAllTypes():Observable<Currency[]>{
    return this._http.get<Currency[]>("/api/Currencyt");
  }

  getcurrancyTypeByCurrancyId(currancyId:number):Observable<Currency>{
    return this._http.get<Currency>("/api/Currencyt/"+currancyId);
  }
  getExchangeRate():Observable<API_Obj>{
    return this._http.get<API_Obj>("/api/CurrencyType");
  }
}
