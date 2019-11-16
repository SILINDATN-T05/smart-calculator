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
  ngOnInit() {
    this.perfomCalculations();
  }

  onButtonPress(symbol) {
    console.log(symbol);
    console.log('this.operator.includes(this.lastValue) : ', this.operator.includes(this.lastValue));
    console.log('this.operator.includes(symbol) : ', this.operator.includes(symbol));
    if (this.value === '' && symbol === '=') {
      alert('Please use the = operator when you have something +, -, / or *');
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
      this.handleDivide(this.Operations);
    }

    while (this.Operations.includes('*')) {
      this.handleMultiply(this.Operations);
    }

    while (this.Operations.includes('+')) {
      this.handleAddition(this.Operations);
    }

    this.results = this.handleSubtration(this.Operations).toString();
  }

  private handleSubtration(cArr: string[]) {
    let tResult = parseFloat(cArr[0]);
    for (let i = 1; i < cArr.length; i++) {
      if (cArr[i] === '-') {
        tResult = tResult - parseFloat(cArr[i + 1]);
      }
      i++;
    }
    return tResult;
  }

  private handleAddition(cArr: string[]) {
    for (let i = 1; i < cArr.length; i++) {
      const cItem = cArr[i];
      if (cItem === '+') {
        const tLeft = parseFloat(cArr[i - 1]);
        const tRight = parseFloat(cArr[i + 1]);
        const nVal = tLeft + tRight;
        cArr[i - 1] = nVal.toString();
        cArr.splice(i, 2);
        i = cArr.length;
      }
    }
  }

  private handleDivide(cArr: string[]) {
    for (let i = 0; i <= cArr.length; i++) {
      const cItem = cArr[i];
      if (cItem === '/') {
        const tLeft = parseFloat(cArr[i - 1]);
        const tRight = parseFloat(cArr[i + 1]);
        const nVal = tLeft / tRight;
        cArr[i - 1] = nVal.toString();
        cArr.splice(i, 2);
        i = cArr.length;
      }
    }
  }

  private handleMultiply(cArr: string[]) {
    for (let i = 0; i <= cArr.length; i++) {
      const cItem = cArr[i];
      if (cItem === '*') {
        const tLeft = parseFloat(cArr[i - 1]);
        const tRight = parseFloat(cArr[i + 1]);
        const nVal = tLeft * tRight;
        cArr[i - 1] = nVal.toString();
        cArr.splice(i, 2);
        i = cArr.length;
      }
    }
  }
}
