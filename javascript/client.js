// Sign-Up Form Validation

// Sign-Up Page required information
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const password_repeat = document.getElementById('password-repeat');
const form = document.getElementById('form');
const errors = document.getElementById('error');

// Error Handling
form.addEventListener('submit', (e) => {
    let errorMessages = []

    // If the password does not match the password confirmation, throw error
    if (password_repeat.value != password.value) {
        errorMessages.push('Passwords do not match.')
    }

    // If there are any errors with the Sign Up screen, display them
    if (errorMessages.length > 0) {
        e.preventDefault()
        errors.innerText = errorMessages.join(', ')
    }

})