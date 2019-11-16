import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  value = '';
  oldValue = '0';

  Operations = [];
  lastValue = '';
  readyForNewInput = true;
  operator = ['x', '-', '+', 'c', '/', '='];
  numberGroups = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];
  results = '';

  constructor() {}
  ngOnInit() {}

  onButtonPress(symbol) {
    console.log(symbol);
    console.log('this.operator.includes(this.lastValue) : ', this.operator.includes(this.lastValue));
    console.log('this.operator.includes(symbol) : ', this.operator.includes(symbol));
    if (this.value === '' && symbol === '=') {
      alert('Please use the = operator when you have something +, -, / or x');
    } else if (symbol === '=') {
      this.perfomCalculations();
    } else if (symbol === 'c') {
      this.value = '';
      this.lastValue = '';
      this.results = '';
    } else {
      if (this.value === '' && this.operator.includes(symbol)) {
        this.value += '0 ' + symbol + ' ';
      } else if (this.operator.includes(this.lastValue) && this.operator.includes(symbol)) {
        console.log('repeat op   : ', symbol);
        this.value += '0 ' + symbol + ' ';
      } else if (this.operator.includes(symbol)) {
        this.value += ' ' +  symbol + ' ';
      } else {
        this.value += symbol;
      }
  }

    this.lastValue = symbol;
  }

  private perfomCalculations() {
    this.Operations = this.value.split(' ');

    while (this.Operations.includes('/')) {
      this.handleDivide();
    }

    while (this.Operations.includes('x')) {
      console.log('this.Operations : ', this.Operations);
      this.handleMultiply();
    }

    while (this.Operations.includes('+')) {
      this.handleAddition();
    }

    this.results = this.handleSubtration().toString();
  }

  private handleSubtration() {
    let tResult = parseFloat(this.Operations[0]);
    for (let i = 1; i < this.Operations.length; i++) {
      if (this.Operations[i] === '-') {
        tResult = tResult - parseFloat(this.Operations[i + 1]);
      }
      i++;
    }
    return tResult;
  }

  private handleAddition() {
    for (let i = 1; i < this.Operations.length; i++) {
      const cItem = this.Operations[i];
      if (cItem === '+') {
        const tLeft = parseFloat(this.Operations[i - 1]);
        const tRight = parseFloat(this.Operations[i + 1]);
        const nVal = tLeft + tRight;
        this.Operations[i - 1] = nVal.toString();
        this.Operations.splice(i, 2);
        i = this.Operations.length;
      }
    }
  }

  private handleDivide() {
    for (let i = 0; i <= this.Operations.length; i++) {
      const cItem = this.Operations[i];
      if (cItem === '/') {
        const tLeft = parseFloat(this.Operations[i - 1]);
        const tRight = parseFloat(this.Operations[i + 1]);
        const nVal = tLeft / tRight;
        this.Operations[i - 1] = nVal.toString();
        this.Operations.splice(i, 2);
        i = this.Operations.length;
      }
    }
  }

  private handleMultiply() {
    for (let i = 0; i <= this.Operations.length; i++) {
      const cItem = this.Operations[i];
      if (cItem === 'x') {
        const tLeft = parseFloat(this.Operations[i - 1]);
        const tRight = parseFloat(this.Operations[i + 1]);
        const nVal = tLeft * tRight;
        this.Operations[i - 1] = nVal.toString();
        this.Operations.splice(i, 2);
        i = this.Operations.length;
      }
    }
  }
}
