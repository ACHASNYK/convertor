import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css']
})
export class ConvertorComponent implements OnInit {
  myForm!: FormGroup;
  @Input() rates_Usd!: number;
  @Input() rates_Eur!: number;
  @Input() rates_Uah!: number;
  number1!: number;
  flow_trigger!: boolean;
  rate1!: number;
  number2!: number;
  rate2!: number

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      number1!: null,
      rate1!: "",
      number2!: null,
      rate2!: "",
      // flow_trigger: true
      
    })
    
    this.leftFormInput();
    // this.rightFormInput();
  }
// <<=== a function to calculate an input from the left source form and update a value of ht eright target form==>>
  leftFormInput() {
    this.myForm.valueChanges.pipe(debounceTime(100)).subscribe(val => {
      if (val.number1 > 0 && this.flow_trigger) {
        let sum = ((val.number1 * this.rate1) / this.rate2).toFixed(2);
        
        this.myForm.get("number2")?.patchValue(Number(sum), { emitEvent: false });
        // this.flow_trigger = true;
      } else {
        if (val.number2 > 0 && !this.flow_trigger) {
          let sum = ((val.number2 * this.rate2) / this.rate1).toFixed(2);
          // this.flow_trigger = false;
          this.myForm.get("number1")?.patchValue(Number(sum), { emitEvent: false })
        }
      }
    })
  }
     
  // get("number1"||"rate1"||"rate2")?
  // <<=== a function to calculate an input from the right source form and update a value of the left target form==>>
  // rightFormInput() {
  //   this.myForm.get("number2")?.valueChanges.pipe(debounceTime(100)).subscribe(val => {
  //     if (val > 0 && this.rate1 && this.rate2) {
  //       let sum = ((val * this.rate2) / this.rate1).toFixed(2);
  //       this.flow_trigger = false;
  //       this.myForm.get("number1")?.patchValue(Number(sum), {emitEvent:false})
  //     }
  //     return null
      
  //   })
  // }
  onFocusLeft() {
    this.myForm.get("number1")?.reset();
    this.flow_trigger = true
  }
  onFocusRight() {
    this.myForm.get("number2")?.reset();
    this.flow_trigger = false
  }
  // <<== 2 function to trigger re-calculation in case both currency rates value changes initiated by user ==>>
  setRate1(e: any): void {
    this.rate1 = e.target.value
    // this.flow_trigger ? this.leftRateChange() : this.rightRateChange()
    
  }

   setRate2(e: any): void {
     this.rate2 = e.target.value
      //  this.flow_trigger? this.leftRateChange() : this.rightRateChange()
  
   }
  leftInputPress() {
    this.flow_trigger = true
  }

  rightInputPress() {
    this.flow_trigger = false
  }
  // initiateRecalcbyRateChange() {
  //   if (this.flow_trigger&&this.number1>0) {
  //     let sum = ((this.number1 * this.rate1) / this.rate2).toFixed(2);
  //     this.myForm.get("number2")?.patchValue(Number(sum), { emitEvent: false })
  //   }
  //   return null
  // }

  // rightRateChange() {
  //   if (this.number2 > 0) {
  //     let sum = ((this.number2 * this.rate2) / this.rate1).toFixed(2);
  //     this.myForm.get("number1")?.patchValue(Number(sum), { emitEvent: false })
  //   }
  //   return null
  // }
  // onChangeLeft() {
  //   return this.amount1 = this.number1 * this.rates_Eur
    
  // }
  // get amount_left() {
  //   return this.myForm.get('number1')
  // }
  // onChangeRight() {
  //   console.log('right')
  // }
}
