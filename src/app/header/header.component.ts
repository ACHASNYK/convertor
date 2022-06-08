import { Component, OnInit } from '@angular/core';
import { RateServiceService } from './rate-service.service';
import { Observable, of } from 'rxjs';
import { Rate } from '../Rate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rates_all: Rate[] = [];
  rates_Usd!: number;
  rates_Eur!: number;
  rates_Uah!: number
  
  

  getEur() {    
    let num = this.rates_all[this.rates_all?.findIndex(ind => ind.cc === "EUR")]?.rate?.toFixed(2)
    // let num = this.rates_all[index]?.rate
    
   
    this.rates_Eur = Number(num)
     
      return Number(num)
    
  }

  getUsd() {
    let num = this.rates_all[this.rates_all?.findIndex(ind => ind.cc === "USD")]?.rate?.toFixed(2)
    // let index = this.rates_all?.findIndex(ind => ind.cc === "USD")
    // return this.rates_all[index]?.rate.toFixed(2)
    
    this.rates_Usd = Number(num)
    return Number(num)
  }

  getUah() {
    let num = 1.0
    return this.rates_Uah = Number(num)
  }

  getDate() {
    
    return this.rates_all[0]?.exchangedate
  }
  
  constructor(private rateService: RateServiceService) {
    
   }

  ngOnInit(): void {
         
    this.rateService.getRate_All().subscribe((res: Rate[]) => {
      this.rates_all = res
    }),
    
    this.getUah();
    
  
    
    
  }

}
