
class Calculator{
    constructor(largeDisplayScreen, smallDisplayScreen){
        this.largeDisplayScreen = largeDisplayScreen;
        this.smallDisplayScreen = smallDisplayScreen;
        this.eraseAll();
    }
    eraseAll(){
        this.presentInput = '';
        this.formerInput =''
        this.operation = undefined;
        this.addOperation = undefined;
    }
    backSpace(){
        this.presentInput =this.presentInput.toString().slice(0,-1);
    }
    appendNumber(number){
        if (number === '.' & this.presentInput.includes('.')) return
        this.presentInput = this.presentInput.toString() + number.toString();
    }
    selectFunction(operation){
        if(this.presentInput ==='')return
        if(this.formerInput !== ''){
            this.compute();
        };
        this.operation = operation;
        this.formerInput = this.presentInput;
        this.presentInput = '';
    }
    selectOperation(operation){
        if(this.presentInput === '')return
        if(this.formerInput !==''){
            this.compute();
        }
        this.operation = operation;
        this.formerInput = this.presentInput;
        this.presentInput = '';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerNumber = parseFloat((stringNumber).split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerNumber)){
            integerDisplay = '';
        }else{
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits:0});
        }
        if (decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay(){
        this.largeDisplayScreen.innerText = this.getDisplayNumber(this.presentInput);
        if (this.operation != null){
            this.smallDisplayScreen.innerText = `${this.getDisplayNumber(this.formerInput)} ${this.operation}`;
        }else{
            this.smallDisplayScreen.innerText = '';
        }
    }
    compute(){
        let computation;
        if(this.presentInput === ''){
            this.presentInput = '1';
        }
        let prev = parseFloat(this.formerInput);
        let curr = parseFloat(this.presentInput);

        if(isNaN(prev) || isNaN(curr))return
        switch (this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case 'X':
                computation = curr * prev;
                break;
            case '÷':
                computation = prev / curr;
                break;
            case 'sin':

                computation = prev * Math.sin(curr*Math.PI/180);
                break;
            case 'cos':
                computation = prev * Math.cos(curr*Math.PI/180);
                break;
            case 'tan':
                computation = prev * Math.tan(curr*Math.PI/180);
                break;
            case 'sqt':
                computation = prev * Math.sqrt(curr);
                break;
            case 'log':
                computation = prev * Math.log10(curr);
                break;
            case 'In':
                computation = prev * Math.log(curr);
                break;
            case 'e':
                computation = prev * Math.exp(curr);
                break;
            case 'x2':
                computation = prev*prev*curr;
                break;
            case 'x3':
                computation = prev*prev*prev*curr;
                break;
            case 'xy':
                computation =  Math.pow(prev,curr);
                break;
            case 'x!':
                let itel =1;
                let jog ;
                let i = prev
                while ( i >= 1){
                    itel = itel * i;
                    --i;
                }
                computation = itel;
                break;
            case '1/x':
                computation = curr* 1/(prev);
                break;
            default:
                return;
        }
        this.presentInput = computation;
        this.operation = undefined;
        this.formerInput= '';
    }
}


const   numberButtons       = document.querySelectorAll('[data-number]'),
        operationButtons    = document.querySelectorAll('[data-operation]'),
        functionButtons     = document.querySelectorAll('[data-function]'),
        deleteButton        = document.querySelector('[data-backspace]'),
        equalsButton        = document.querySelector('[data-equals]'),
        clearAllButton      = document.querySelector('[data-clear-all]'),
        largeDisplayScreen  = document.querySelector('[data-large]'),
        smallDisplayScreen  = document.querySelector('[data-small]'),
        SQRTtext            = document.querySelector('[data-square-root]'),
        piButton            = document.querySelector('[data-pi]')

const calculator            = new Calculator(largeDisplayScreen, smallDisplayScreen);

piButton.addEventListener('click', () =>{
    grof = button.innerText;

})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

powerButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.selectFunction(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () =>{
    calculator.backSpace();
    calculator.updateDisplay();
})
clearAllButton.addEventListener('click', () =>{
    calculator.eraseAll();
    calculator.updateDisplay()
})

functionButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
})
