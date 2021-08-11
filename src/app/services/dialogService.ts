import { Injectable } from '@angular/core';  
import { Observable, Subject } from 'rxjs';  
  
@Injectable({ providedIn: 'root' })  
export class DialogService {  
    private dialogSubject = new Subject<any>();  
      
    sendDialog(dialog: {type: number, message: string}) {  
        this.dialogSubject.next(dialog);  
    }  
  
    clearDialog() {  
        this.dialogSubject.next();  
    }  
  
    getDialog(): Observable<any> {  
        return this.dialogSubject.asObservable();  
    }  
}  
