import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  value = '0';
  oldValue = '0';

  lastOperator = 'x';
  readyForNewInput = true;
  numberGroups = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];

  constructor() {}
  ngOnInit() {}

  onButtonPress(symbol) {
    console.log(symbol);

    if (isNumber(symbol)) {
      console.log('is a number');
      if (this.readyForNewInput) {
        this.value = '' + symbol;
      } else {
        this.value += '' + symbol;
      }
      this.readyForNewInput = false;
    } else if (symbol === 'c') {
      this.value = '0';
      this.readyForNewInput = true;
    } else if (symbol === '=') {
      if (this.lastOperator === 'x') {
        this.value = '' + (parseInt(this.oldValue, 10) * parseInt(this.value, 10));
      } else if (this.lastOperator === '-') {
        this.value = '' + (parseInt(this.oldValue, 10) - parseInt(this.value, 10));
 } else if (this.lastOperator === '+') {
        this.value = '' + (parseInt(this.oldValue, 10) + parseInt(this.value, 10));
 } else if (this.lastOperator === '/') {
        this.value = '' + (parseInt(this.oldValue, 10) / parseInt(this.value, 10));
 }
      this.readyForNewInput = true;
    } else { // operator
      this.readyForNewInput = true;
      this.oldValue = this.value;
      this.lastOperator = symbol;
    }
  }
}
