const numbersButtons = Array.from(document.querySelectorAll('[data-type="number"]'));
const operatiorButtons = Array.from(document.querySelectorAll('[data-type="operator"]'));

const result = document.querySelector('.result p');
let operating = '';
let totalOperation = 0;
const operatingList = [];
const operatorList = [];

function operation(operatingOne, operatingTwo, operator) {

    if ( operator == '+' ) return operatingOne + operatingTwo;
    if ( operator == '-' ) return operatingOne - operatingTwo;
    if ( operator == 'x' ) return operatingOne * operatingTwo;
    if ( operator == '/' ) { 

        if ( operatingTwo === 0) {

            console.log('No se puede dividir por 0 intenta orta operación!');

        } else {

            return operatingOne / operatingTwo;

        }

    }

}

numbersButtons.forEach(btn => {

    btn.addEventListener('click', e => {

        if (result.textContent === '0') {

            result.textContent = e.target.value;
            operating = result.textContent;

        } else {

            if (e.target.value === ',') {

                if ( result.textContent.includes(',') ) {

                    console.log(operating);
                    

                } else {

                    result.textContent = result.textContent + e.target.value;
                    operating += '.';

                }

            } else {

                result.textContent = result.textContent + e.target.value;
                operating += e.target.value;
                console.log(operating);
                

            }
        }

    });

});

operatiorButtons.forEach(btn => {

    btn.addEventListener('click', e => {

        if (e.target.value == '=') {

            operatingList.push(Number(operating));
            operating = '';

            for (let i = 0; i < operatingList.length; i++) {

                if ( ( i + 1 ) >=  operatingList.length ) {

                    break;

                } else {

                    totalOperation = operation(operatingList[i], operatingList[i+1], operatorList[i]);         

                }
                
            }

            operatingList.length = 0;
            operatorList.length = 0;
            result.textContent = String(totalOperation);
            operatingList.push(totalOperation);
            operating = '';

        } else {

            if ( e.target.value == 'delete' ) {

                if ( isNaN(result.textContent.at(-1)) && result.textContent.at(-1) !== ',') {
                    
                    operatorList.pop();
                
                } else {
                    
                    if ( operating.length === 1 ) {

                        operating = '';

                    } else {

                        operating = operating.slice(0, operating.length - 1);
                    }
                }
                
                result.textContent = result.textContent.slice(0 , result.textContent.length - 1);

            } else if ( e.target.value == 'delete-all' ) {

                result.textContent = '0';
                operatingList.length = 0;
                operatorList.length = 0;
                operating = '';

            } else {
                
                if ( operating != '' ) {
                    
                    operatingList.push(Number(operating));
                    operating = '';
                    
                }
                
                operatorList.push(e.target.value);
                result.textContent = result.textContent + e.target.value;

            }

        }

    });

});
