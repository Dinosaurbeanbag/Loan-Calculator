//event listener on submit button 
//create variable that stores the form to target
const form = document.getElementById('loan-form');

//add event listner to button
const listen = form.addEventListener('submit', function(e){

    //hide the results
    document.getElementById('results').style.display = 'none';

    //show the loading image 
    document.getElementById('img').style.display = 'block';

    //set the loading image to display for 2 seconds before calling the function to calculate the information
    setTimeout(calculate,2000);

    document.querySelector('#btn-submit').disabled = true; //disables submit button 

    e.preventDefault();
});

//create calculation function
function calculate(){

    //UI variables 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years')   
    const monthlyPayments = document.getElementById('monthly-payment');
    const totalPayments = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12; 

    //monthly repayment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x *calculatedInterest) / (x - 1);

    //validation of monthly payments being finite number
    if (isFinite(monthly)) {
        monthlyPayments.value = monthly.toFixed(2);
        totalPayments.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('img').style.display = 'none';
        document.querySelector('#btn-submit').disabled = false; //allows button to be enabled again

    } else {
        showError('Please check your numbers'); //calls error functin to display message 
    }


} //End of function 

//function to display an error 
function showError(error){
    
    //hide results
    document.getElementById('results').style.display = 'none';
    //hide image 
    document.getElementById('img').style.display = 'none';

    //store variables
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //create new div 
    const errorDiv = document.createElement('div');

    //add class to div
    errorDiv.className = 'alert alert-danger';

    //add text node and append it to the div 
    errorDiv.appendChild(document.createTextNode(error));

    //insert error message before heading in html flow
    card.insertBefore(errorDiv, heading);

    //remove error message after 3 seconds 
    setTimeout(timeout, 3000);

    
}

//function to remove the bootstrap alert class from the error message
function timeout(){
    document.querySelector('.alert').remove();
    }