import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient,
    public toastService : ToastService,
    private router : Router
  ) { }



  get(requestParam : any) {
    return this.http.get(environment.baseUrl +  requestParam.url).pipe(
      tap((data:any) => {
          return data
      }, error => {
      }),
      catchError(this.handleError([]))
    )
  }


  post(requestParam : any){
    return this.http.post(environment.baseUrl +  requestParam.url, requestParam.payload).pipe(
      tap((data:any) => {
          return data
      }),
      catchError(this.handleError([]))
    )
  }


  private handleError(result : any) {
    return (error: any): Observable<any> => {
        console.log(error.error.message,"error");
        if (error.status === 401) {
      } else {
        console.log(error.error.message,"error");
        this.toastService.showMessage(error.error.message,'error');
      }
      return of(result);
    };
  }
}
