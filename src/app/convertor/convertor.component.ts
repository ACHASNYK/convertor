import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
  AbstractControl, ValidationErrors,
  ValidatorFn} from '@angular/forms';
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

  // <<== Validation pattern for correct only positive digits input
  ngOnInit(): void {
    this.myForm = this.fb.group({
      number1!: [null, [Validators.required,
                        Validators.min(Number.MIN_VALUE),
                        Validators.pattern('^0\.[0-9]*|[1-9]*$')]],
      rate1!: ["", Validators.required],
      number2!: [null, [Validators.required,
                        Validators.min(Number.MIN_VALUE),
                        Validators.pattern('^0\.[0-9]*|[1-9]*$')]],
      rate2!: ["", Validators.required]
      // flow_trigger: true
      
    })
    // ^(0|[0-9][0-9]*)$
    this.calculateInput();
    
  }
  // <<=== a function to track an inputs from the controlled fields, 
  // <<=== calculate sum and update a value of the related target form,
  // <<=== and to update related filed in accordance to the flowtrigger.
  
  calculateInput() {
    this.myForm.valueChanges.pipe(debounceTime(150)).subscribe(val => {

      if (val.number1 > 0 && this.flow_trigger && this.rate1 && this.rate2) {
        let sum = ((val.number1 * this.rate1) / this.rate2).toFixed(2);
        this.myForm.get("number2")?.patchValue(Number(sum), { emitEvent: false });
        
      } else {
        if (val.number2 > 0 && !this.flow_trigger && this.rate1 && this.rate2) {
          let sum = ((val.number2 * this.rate2) / this.rate1).toFixed(2);
          this.myForm.get("number1")?.patchValue(Number(sum), { emitEvent: false })
        }
      }
    })
  }
     
  // <<=== a helper functions which triggers a flowtrigger flag 
  // <<=== to set a source truth field for calculation flow for the calculateInput function.
  // <<=== also reset a field after focus on it.
  
  onFocusLeft() {
    this.myForm.get("number1")?.reset();
    this.flow_trigger = true
  }
  onFocusRight() {
    this.myForm.get("number2")?.reset();
    this.flow_trigger = false
  }
  
  // <<== 2 functions to set both currency rates value changes initiated by user ==>>
  
  setRate1(e: any): void {
    this.rate1 = e.target.value
  }

  setRate2(e: any): void {
    this.rate2 = e.target.value
  }
  
  Validaterate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.rate1 || !this.rate2) {
        return { Validaterate: false };
      }
      return null;
    }
  
  }
}
