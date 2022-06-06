import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css']
})
export class ConvertorComponent implements OnInit {
  @Input() color!: string;
  // @Input() eur_rate: number;
  constructor() { }

  ngOnInit(): void {
  }

  onChangeLeft() {
    console.log('changeleft')
  }

  onChangeRight() {
    console.log('right')
  }
}
