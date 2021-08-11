import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private _http: HttpClient) { }
  getAllUsers():Observable< User[]>{
    return this._http.get<User[]>("/api/User");
    }
}
