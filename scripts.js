let previousOperations = [];

function calculate() {
  const firstNumber = document.getElementById('firstNumber');
  const operator = document.getElementById('operator');
  const secondNumber = document.getElementById('secondNumber');

  if (isNaN(firstNumber.value) || isNaN(secondNumber.value)) {
    previousOperations.push('Ошибка: неверный ввод');
    updateResults();
    return;
  }

  const num1 = parseFloat(firstNumber.value);
  const num2 = parseFloat(secondNumber.value);
  let result;

  switch (operator.value) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (Math.abs(num2)<Number.EPSILON) {
        previousOperations.push('Ошибка: деление на ноль');
        updateResults();
        return;
      }
      result = num1 / num2;
      break;
    default:
      previousOperations.push('Неизвестная операция');
      updateResults();
      return;
  }

  const operationStr = `${num1} ${operator.value} ${num2} = ${result}`;
  previousOperations.push(operationStr);

  updateResults();
}

function updateResults() {
  if (previousOperations.length > 3) {
    previousOperations.shift();
  }
  const resultField = document.getElementById('result');
  resultField.innerHTML = '';
  previousOperations.forEach((operation, index) => {
    const operationElement = document.createElement('div');
    operationElement.innerHTML = operation;
    if (index !== previousOperations.length - 1) {
      operationElement.classList.add('previous-operation');
    }
    resultField.appendChild(operationElement);
  });
}

