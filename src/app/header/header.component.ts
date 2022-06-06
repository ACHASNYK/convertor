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
  rate!: Rate[];

  // getUsd() {
  //   return this.usd_rate;
  // }

  // getEur() {
  //   return this.eur_rate;
  // } 

  
  constructor(private rateService: RateServiceService) {
    
   }

  ngOnInit(): void {
    this.rateService.getRate_EUR().subscribe((rate) => (this.rate = rate))
  }

}
