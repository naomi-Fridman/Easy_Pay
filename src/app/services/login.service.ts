import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Loan } from "../models/Loan";
import { User } from "../models/User";
import { MangerDetails } from "../models/MangerDetails";
@Injectable({
  providedIn: "root",
})
@Injectable()
export class LoginService {
  constructor(private _http: HttpClient) {}
  getUserFromServer(
    password: string,
    userName: string
  ): Observable<MangerDetails> {
    return this._http.get<MangerDetails>(`/api/Login/${password}/${userName}`);
  }

  saveManagerInServer(manager: MangerDetails): Observable<number> {
    return this._http.post<number>("/api/Login/addManager", manager);
  }
}
