import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rate } from '../Rate';

@Injectable({
  providedIn: 'root'
})
export class RateServiceService {
  private apiUrl_USD = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=USD'
  private apiUrl_EUR = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=EUR'
  
  constructor(private http: HttpClient) { }
  
  getRate_USD(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.apiUrl_USD)
  } 

  getRate_EUR(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.apiUrl_EUR)
  }


}

  