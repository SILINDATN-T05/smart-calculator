import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  value = '';
  oldValue = '0';

  lastOperator = 'x';
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

    this.lastValue = symbol;
    // if (!this.operator.includes(symbol)) {
    //   console.log('is a number');
    //   if (this.readyForNewInput) {
    //     this.value = '' + symbol;
    //   } else {
    //     this.value += '' + symbol;
    //   }
    //   this.readyForNewInput = false;
    // } else if (symbol === 'c') {
    //   this.value = '0';
    //   this.readyForNewInput = true;
    // } else if (symbol === '=') {
    //   this.perfomCalculations();
    // } else { // operator
    //   this.readyForNewInput = true;
    //   this.oldValue = this.value;
    //   this.lastOperator = symbol;
    // }
  }

  private perfomCalculations() {
    let cArr = ['1', '*', '4', '-', '12', '/', '2'] ;
    this.value = cArr.join(' ');
    // 1*4-12/2
    // Handle Multiply
    for (let i = 0; i <= cArr.length; i++) {
        const cItem = cArr[ i ];
        if (cItem === '*') {
            const tLeft = parseFloat(cArr[ i - 1 ]);
            const tRight = parseFloat(cArr[ i + 1 ]);

            const nVal = tLeft * tRight;
            cArr[i - 1] = nVal.toString();
            cArr.splice(i, 2);
            i = cArr.length;
        }
    }

    // Handle Divide
    for (let i = 0; i <= cArr.length; i++) {
        const cItem = cArr[ i ];
        if (cItem === '/') {
            const tLeft = parseFloat(cArr[ i - 1 ]);
            const tRight = parseFloat(cArr[ i + 1 ]);

            const nVal = tLeft / tRight;
            cArr[ i - 1 ] = nVal.toString();
            cArr.splice(i, 2);
            i = cArr.length;
        }
    }

    // Handle Plus
    for (let i = 1; i < cArr.length; i++) {
        const cItem = cArr[ i ];
        if (cItem === '+') {
          const tLeft = parseFloat(cArr[ i - 1 ]);
          const tRight = parseFloat(cArr[ i + 1 ]);

          const nVal = tLeft / tRight;
          cArr[ i - 1 ] = nVal.toString();
          cArr.splice(i, 2);
          i = cArr.length;
        }
    }

    // Handle Minus
    let tResult = parseFloat(cArr[ 0 ]);
    for (let i = 1; i < cArr.length; i++) {
        if (cArr[ i ] === '-') {
            tResult = tResult - parseFloat(cArr[ i + 1 ]);
        }
        i++;
    }

    this.results = tResult.toString();
    // if (this.lastOperator === 'x') {
    //   this.value = '' + (parseInt(this.oldValue, 10) * parseInt(this.value, 10));
    // } else if (this.lastOperator === '-') {
    //   this.value = '' + (parseInt(this.oldValue, 10) - parseInt(this.value, 10));
    // } else if (this.lastOperator === '+') {
    //   this.value = '' + (parseInt(this.oldValue, 10) + parseInt(this.value, 10));
    // } else if (this.lastOperator === '/') {
    //   this.value = '' + (parseInt(this.oldValue, 10) / parseInt(this.value, 10));
    // }
    this.readyForNewInput = true;
  }
}
