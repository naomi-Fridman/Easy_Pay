import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/Payment';
import { DTO_Payments } from 'src/app/models/DTO_Payments';
import { DTO_User } from 'src/app/models/DTO_User';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private _http: HttpClient) { }

  getAllPayments(dtoPayments: DTO_Payments): Observable<Payment[]> {
    // var temp;
    // if (dtoPayments.firstName == "")
    //   dtoPayments.firstName = null;
    // if (dtoPayments.lastName == "")
    //   dtoPayments.lastName = null;
    // temp = dtoPayments.collectionSumTill
    // dtoPayments.collectionSumTill = parseInt(temp)
    // temp = dtoPayments.collectionSumFrom
    // dtoPayments.collectionSumFrom = parseInt(temp)
    // temp = dtoPayments.collectionSumExact
    // dtoPayments.collectionSumExact = parseInt(temp)
    // temp = new Date(dtoPayments.dateFrom)
    // dtoPayments.dateFrom = temp
    
    return this._http.post<Payment[]>("/api/Payments", dtoPayments);
  }
  updatePayment(updatedPayment: Payment): Observable<number> {
    return this._http.put<number>("/api/Payments", updatedPayment);
  }
  getAllPaymentsThatWerentPadeByDate(paymentDay: Date): Observable<DTO_User[]> {

    return this._http.get<DTO_User[]>("/api/Payments/getAllPaymentsThatWerentPadeByDate?paymentDay=" + paymentDay.toISOString());
  }
  getAllIncomingPaymentsToday(dtoPayments: DTO_Payments): Observable<Payment[]> {
    return this._http.post<Payment[]>("/api/Payments", dtoPayments);
  }
  postPayment(newPayment: Payment): Observable<number> {
    return this._http.post<number>("/api/Payments/newPayment",newPayment);
  }
  
  getTheLastPayment(): Observable<Payment> {
    return this._http.get<Payment>("/api/Payments");
  }
  getPaymentForLoan(userId: number, typeId): Observable<Payment[]> {
    return this._http.get<Payment[]>("/api/Payments/"+{userId}+"/"+{typeId});
  }
  deletePayment(paymentId: number):Observable<any>{
    return this._http.delete(`/api/Payments/${paymentId}`);
  }
}





