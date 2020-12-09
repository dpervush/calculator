'use strict';

class Calculator {
  constructor(prevOperandTextElem, currOperandTextElem) {
    this.prevOperandTextElem = prevOperandTextElem;
    this.currOperandTextElem = currOperandTextElem;
    this.clear();
  }

  clear() {
    this.prevOperand = '';
    this.currOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currOperand.includes('.')) { return; }
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === '') return;
    if (this.prevOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let result = 0;

    const prevNumber = parseFloat(this.prevOperand),
      currNumber = parseFloat(this.currOperand);

    if (isNaN(prevNumber) || isNaN(currNumber)) return;
    switch (this.operation) {
      case '+': {
        result = prevNumber + currNumber;
        break;
      }
      case '-': {
        result = prevNumber - currNumber;
        break;
      }
      case '/': {
        result = (prevNumber / currNumber).toFixed();
        break;
      }
      case '*': {
        result = prevNumber * currNumber;
        break;
      }
      default:
        return;
    }
    this.currOperand = result;
    this.operation = undefined;
    this.prevOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if (isNaN(intDigits)) {
      integerDisplay = 0;
    } else {
      integerDisplay = intDigits.toLocaleString('ru', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOperandTextElem.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation) {
      this.prevOperandTextElem.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
      this.prevOperandTextElem.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]'),
  operationButtons = document.querySelectorAll('[data-operation]'),
  deleteButton = document.querySelector('[data-delete]'),
  allClearButton = document.querySelector('[data-all-clear]'),
  equalsButton = document.querySelector('[data-equals]');

const prevOperandTextElement = document.querySelector('[data-prev-operand]'),
  currOperandTextElement = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', (e) => {
  e.preventDefault();
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', (e) => {
  e.preventDefault();
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (e) => {
  e.preventDefault();
  calculator.delete();
  calculator.updateDisplay();
});