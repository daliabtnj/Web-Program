/*------------------------------------------------------------------------------------------------------*/
<<<<<<< HEAD
// signup confirmation for client


/*------------------------------------------------------------------------------------------------------*/
// signup confirmation for admin
=======
// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const clientSignUpForm = document.getElementById('client-sign-up-form');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('password-repeat');
    const errorDiv = document.getElementById('error');

    if (clientSignUpForm) {
        clientSignUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            errorDiv.textContent = '';

            // Check if passwords match
            if (password.value !== passwordRepeat.value) {
                errorDiv.textContent = 'Passwords do not match.';
                return;
            }

            // Display the confirmation modal if sign-up is successful
            document.getElementById("confirmationModal").style.display = "flex";
        });
    };

});

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}
>>>>>>> 1afcf085fd3e72e1ffd7b8d724adb159bb473d62



/*------------------------------------------------------------------------------------------------------*/

// booking confirmation for client with message
function bookService() {
    const confirmationNumber = Math.floor(Math.random() * 10000000);
<<<<<<< HEAD
    document.getElementById("confirmationText").innerHTML = 
        "Your booking was a success! Booking confirmation #" + confirmationNumber +
        "<br>You can go to My Request section to see your booking.";
=======

    // Get the current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    // Update confirmation message with date and time
    document.getElementById("confirmationText").innerHTML =
        "Your booking was a success! Booking confirmation #" + confirmationNumber +
        "<br>Booked on: " + formattedDate + " at " + formattedTime +
        "<br>You can go to My Request section to see your booking.";

    // Show the modal
>>>>>>> 1afcf085fd3e72e1ffd7b8d724adb159bb473d62
    document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}




/*------------------------------------------------------------------------------------------------------*/

// admin pop ups below... (HEENA)