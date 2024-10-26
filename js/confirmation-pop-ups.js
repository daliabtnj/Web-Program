/*------------------------------------------------------------------------------------------------------*/
// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const clientSignUpForm = document.getElementById('client-sign-up-form');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('password-repeat');
    const errorDiv = document.getElementById('error');

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
});

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}



/*------------------------------------------------------------------------------------------------------*/

// booking confirmation for client with message
function bookService() {
    const confirmationNumber = Math.floor(Math.random() * 10000000);
    document.getElementById("confirmationText").innerHTML = 
        "Your booking was a success! Booking confirmation #" + confirmationNumber +
        "<br>You can go to My Request section to see your booking.";
    document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}




/*------------------------------------------------------------------------------------------------------*/

// admin pop ups below... (HEENA)