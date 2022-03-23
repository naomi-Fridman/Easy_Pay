import { Injectable } from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guaranty } from 'src/app/models/Guaranty';
import { Loan } from 'src/app/models/Loan';
import { DTO_loans } from 'src/app/models/DTO_loans';
import { Loaner } from '../models/Loaner';
 
@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private _http: HttpClient) { }
  getAllLoans(dtoLoans:DTO_loans):Observable< Loan[]>{
    // var sum;
    // sum=dtoLoans.sumTill
    // dtoLoans.sumTill=parseInt(sum)
    // sum=dtoLoans.sumFrom
    // dtoLoans.sumFrom=parseInt(sum)
    // sum=dtoLoans.sumExact
    // dtoLoans.sumExact=parseInt(sum)
    return this._http.post<Loan[]>("/api/Loans",dtoLoans);
   }
 
  getPaymentIdByTypeName(typeName: string): Observable<number> {
    return this._http.get<number>(`/api/PaymentType/${typeName}`)
  }
  
  getGuarantiesForLoan(guarantiesId: number[]): Observable<Guaranty[]> {
    let params = new HttpParams();
    for (const guaranty of guarantiesId) {
      params = params.append('guarantiesId', JSON.stringify(guaranty));
    }
    return this._http.get<Guaranty[]>("/api/Guaranty/", { params:  params  })
  }
  updateLoan(loan:Loan):Observable<void>{
    return this._http.put<void>("/api/Loans",loan)
  }
  postLoan(newLoan:FormData):Observable<DTO_loans>{
    return this._http.post<DTO_loans>("/api/Loans/postNewLoan",newLoan)
  }
  checkIfUserHasLoan(userId:number):Observable<Loan>{
    return this._http.get<Loan>("/api/Loans/checkIfUserHasLoan/"+userId)
  }
  deleteLoan(loanId :number):Observable<any>{
    return this._http.delete(`/api/Loans/${loanId}`);
  }
  
}
