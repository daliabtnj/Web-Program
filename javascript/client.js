// Sign-Up Form Validation





// var isLoggedIn = false;

// var current_user_name;
// var current_user_email;
// var current_user_phone;
// var current_user_password;

// Error Handling and Form Validation
document.addEventListener('DOMContentLoaded', () => {
    // Sign-Up Page required information

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const password_repeat = document.getElementById('password-repeat');
    const form = document.getElementById('form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            // If the password does not match the password confirmation, throw error
            if (password_repeat.value != password.value) {
                errorMessages.push('Passwords do not match.');
            }

            // If there are any errors with the Sign Up screen, display them
            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ')
            }
            else {
                // window.localStorage.setItem("user_name", name.value);
                // window.localStorage.setItem("user_email", email.value);
                // window.localStorage.setItem("user_phone", phone.value);
                // window.localStorage.setItem("user_password", password.value);

                // current_user_name = window.localStorage.getItem("user_name");
                // current_user_email = window.localStorage.getItem("user_email");
                // current_user_phone = window.localStorage.getItem("user_phone");
                // current_user_password = window.localStorage.getItem("user_password");




                // isLoggedIn = true;
                console.log("Form is valid. Redirecting...");
                window.location.href = "customer-dashboard.html";   // redirect to customer dashboard

                // console.log(`User First Name: ${current_user_name}\n`);
                // console.log(`User Email Name: ${current_user_email}\n`);

            }

        });
    }
});

// // testing loop to check if user is logged in
// while (isLoggedIn === true) {
//     console.log(`User First Name: ${current_user_name}\n`);
//     console.log(`User Email Name: ${current_user_email}\n`);
// }




