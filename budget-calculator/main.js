let initialBalance = JSON.parse(localStorage.getItem("initialBalance"));
let expensesAmount = JSON.parse(localStorage.getItem("expensesAmount")); ;
let currentBalance = JSON.parse(localStorage.getItem("currentBalance")); ;
const expensesList = JSON.parse(localStorage.getItem("expensesList"));    


function add() {
    let inputIncomeTitle = document.getElementById('input-income-title').value;
    let inputIncomeAmount = document.getElementById('input-income-amount').value;
    // check for invalid input entries
    if (inputIncomeTitle == '' || inputIncomeAmount == '') {
        alert('Please fill in all feilds');
        return false;
    }
    if (isNaN(inputIncomeAmount) || inputIncomeAmount < 0 || inputIncomeAmount > 1000000000) {
        alert('Please enter a correct amount of money')
        return false;
    }

    // add input value to total and current balances
    initialBalance += Number(inputIncomeAmount);
    currentBalance += Number(inputIncomeAmount);
    updateBalance();

    // add title and value to array and display it using createList();
    let temp = {'title': inputIncomeTitle, 'value': inputIncomeAmount, 'expense': false};
    expensesList.push(temp);
    document.getElementById('table-body').innerHTML = '';1
    createList();
    changeColor();

    // clear input boxes
    document.getElementById('input-income-title').value = '';
    document.getElementById('input-income-amount').value = '';
    storage();
}
function subtract() {
    let inputExpensesTitle = document.getElementById('input-expenses-title').value;
    let inputExpensesAmount = document.getElementById('input-expenses-amount').value;
        
    // check for invalid input entries
    if (inputExpensesTitle == '' || inputExpensesAmount == '') {
        alert('Please fill in all feilds');
        return false;
    }
    if (isNaN(inputExpensesAmount) || inputExpensesAmount < 0 || inputExpensesAmount > 1000000000) {
        alert('Please enter a correct amount of money')
        return false;
    }

    // increase expenses counter and decrease current balance
    expensesAmount += Number(inputExpensesAmount);
    currentBalance -= Number(inputExpensesAmount);
    updateBalance();

    // add expense to the expensesList array
    let temp = {'title': inputExpensesTitle, 'value': inputExpensesAmount, 'expense': true};
    expensesList.push(temp);
    document.getElementById('table-body').innerHTML = '';
    createList();
    changeColor();

    //clear input boxes
    document.getElementById('input-expenses-title').value = '';
    document.getElementById('input-expenses-amount').value = '';
    storage();
}

function createList() {
    if (expensesList) {
        let index = 0;
        for (const expenses of expensesList) {
            if (!expenses.expense) {
                document.getElementById('table-body').innerHTML += `<tr>
                <td><input value="${expenses.title}" id="item-title-${index}" style="color: rgb(4, 155, 4); border: none; background: none;" disabled></input></td>
                <td style="color: rgb(4, 155, 4)">+${expenses.value}</td>
                <td>
                    <button class="edit-item" onclick="editItem(${index})"><i class="fa fa-edit"></i></button>
                </td>
                <td>
                    <button class="delete-item" onclick="removeItem(${index})"><i class="fa fa-trash"></i></button>
                </td>
                </tr>`; 
            } else {
                document.getElementById('table-body').innerHTML += `<tr>
                <td style="color: rgb(150, 14, 14)" contenteditable="true">${expenses.title}</td>
                <td style="color: rgb(150, 14, 14)" contenteditable="true">-${expenses.value}</td>
                <td>
                    <button class="edit-item"><i class="fa fa-edit"></i></button>
                </td>
                <td>
                    <button class="delete-item" onclick="removeItem(${index})"><i class="fa fa-trash"></i></button>
                </td>
                </tr>`;
            }
            index++;
        }
    }
}
function editItem(index) {
}
function removeItem(index) {
    if (expensesList[index].expense) {
        expensesAmount -= Number(expensesList[index].value);
        currentBalance += Number(expensesList[index].value);
        updateBalance();
    } else {
        initialBalance -= Number(expensesList[index].value);
        currentBalance -= Number(expensesList[index].value);
        updateBalance();
    }
    expensesList.splice(index, 1);
    document.getElementById('table-body').innerHTML = '';
    createList();
    changeColor();
    storage();
}
function clearAll() {
    expensesList.length = 0;
    document.getElementById('table-body').innerHTML = '';
    initialBalance = 0; 
    expensesAmount = 0;
    currentBalance = 0;

    updateBalance();
    changeColor();
    storage();
}

// change colors and visuals of blances as they change
function changeColor() {
    if (currentBalance < 0) {
        let prop = -1 * currentBalance;
        document.getElementById("current-balance").innerHTML = `-$${prop}`

        document.getElementById("current-balance").style.color = '#960e0e';
    } else if (currentBalance === 0) {
        document.getElementById("current-balance").style.color = 'black';
    } else {
        document.getElementById('current-balance').style.color = '#049b04';
    }

    if (initialBalance === 0) {
        document.getElementById("initial-balance").style.color = 'black';
    } else {
        document.getElementById('initial-balance').style.color = '#049b04';
    }
    
    if (expensesAmount === 0) {
        document.getElementById('expenses').style.color = 'black';
    } else {
        document.getElementById('expenses').style.color = '#960e0e';
    }
}
function updateBalance() {
    document.getElementById('initial-balance').innerHTML = `$${initialBalance}`
    document.getElementById('expenses').innerHTML = `$${expensesAmount}`
    document.getElementById('current-balance').innerHTML = `$${currentBalance}`
}

function storage() {
    localStorage.setItem('initialBalance', JSON.stringify(initialBalance));
    localStorage.setItem('expensesAmount', JSON.stringify(expensesAmount));
    localStorage.setItem('currentBalance', JSON.stringify(currentBalance));
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
}



createList();
updateBalance();
changeColor();

// Allow enter key to input data
document.getElementById('input-income-title').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('income-button').click();
    }
})
document.getElementById('input-income-amount').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('income-button').click();
    }
})

document.getElementById('input-expenses-title').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('expenses-button').click();
    }
})
document.getElementById('input-expenses-amount').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('expenses-button').click();
    }
})

document.getElementById('income-button').addEventListener('click', add);
document.getElementById('expenses-button').addEventListener('click', subtract);
document.getElementById('clear-button').addEventListener('click', clearAll);


