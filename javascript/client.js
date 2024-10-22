// Sign-Up Form Validation

// Sign-Up Page required information
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const password = document.getElementById('password').value;
const password_repeat = document.getElementById('password-repeat').value;
const form = document.getElementById('form');
const errors = document.getElementById('error');

let client = {
    'name': name,
    'email': email,
    'phone': phone,
    'password': password,
};

// let client_arr = [];




// Error Handling and Form Validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errorMessages = [];
    errors.innerText = '';

    // If the password does not match the password confirmation, throw error
    if (password_repeat != password) {
        errorMessages.push('Passwords do not match.');
    }

    // If there are any errors with the Sign Up screen, display them
    if (errorMessages.length > 0) {
        errors.innerText = errorMessages.join(', ')
    }
    else {
        // client_arr.push(client);

        // client = JSON.stringify(client);

        localStorage.setItem("client", JSON.stringify(client))

        let newClient = localStorage.getItem("client");


        console.log("Form is valid. Redirecting...");
        window.location.href = "customer-dashboard.html";   // redirect to customer dashboard
        console.log(JSON.parse(newClient));
    }

});

