import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rate } from '../Rate';

@Injectable({
  providedIn: 'root'
})
export class RateServiceService {
  
  private apiUrl_all = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  
  constructor(private http: HttpClient) { }
  
  getRate_All(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.apiUrl_all)
  }


}

  