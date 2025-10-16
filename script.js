const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = displayValue;
}

buttons.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target.dataset;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'C':
            resetCalculator();
            break;
        case '=':
            handleEquals();
            break;
        default:
            if (Number.isInteger(parseInt(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (waitingForSecondOperand) return;

    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function calculate(first, second, op) {
    if (op === '+') {
        return first + second;
    }
    if (op === '-') {
        return first - second;
    }
    if (op === '*') {
        return first * second;
    }
    if (op === '/') {
        return first / second;
    }

    return second;
}

function handleEquals() {
    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForSecondOperand) {
        const result = calculate(firstOperand, inputValue, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
}

function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

updateDisplay();
