import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})

export class TextInputComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  @Input()
  label!: string;
  @Input()
  maxlength: number = 524; //valore standard dell'html
  @Input()
  type: 'text' | 'password' | 'email' | 'date' = 'text';
  
  constructor() {
    if(this.type === 'date') {
      document.getElementsByTagName('input')[0].setAttribute("min", "1-01-01");
      document.getElementsByTagName('input')[0].setAttribute("max", "31-12-30");
    }
  }
  get formControl() {
    return this.control as FormControl;
  }
}
