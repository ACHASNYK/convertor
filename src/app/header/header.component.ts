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
  rates_all: Rate[]=[];
  

  getEur() {
    
    let index = this.rates_all?.findIndex(ind =>ind.cc==="EUR")
    return this.rates_all[index]?.rate.toFixed(2)
    
  }

  getUsd() {
    let index = this.rates_all?.findIndex(ind => ind.cc === "USD")
    return this.rates_all[index]?.rate.toFixed(2)
  }

  getDate() {
    // let index = this.rates_all?.findIndex(ind =>ind.cc==="EUR")
    return this.rates_all[0]?.exchangedate
  }
  
  constructor(private rateService: RateServiceService) {
    
   }

  ngOnInit(): void {
         
    this.rateService.getRate_All().subscribe((res: Rate[]) => {
      this.rates_all = res
    })
    
  }

}
