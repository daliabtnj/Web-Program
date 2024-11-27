/*------------------------------------------------------------------------------------------------------*/
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



/*------------------------------------------------------------------------------------------------------*/

/*
// booking confirmation for client with message
function bookService() {
    const confirmationNumber = Math.floor(Math.random() * 10000000);

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
    document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}
*/

// Book service 
async function bookService(serviceId) {
    console.log("Service ID received:", serviceId); // Add this line to debug

    const clientId = localStorage.getItem("client_id"); // Retrieve client_id from localStorage
    // Format the date to YYYY-MM-DD
    const today = new Date();
    const bookingDate = today.toISOString().split('T')[0]; // Extracts the date portion (YYYY-MM-DD)
    const status = "Pending";

    const response = await fetch("/api/book-service", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: clientId,  // Send the client_id along with other details
            service_id: parseInt(serviceId, 10),  // Send the service_id as an integer
            status: status,
            date: bookingDate,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        const confirmationNumber = Math.floor(Math.random() * 10000000);

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
        document.getElementById("confirmationModal").style.display = "flex";
    } else {
        alert(data.error || "An error occurred.");
    }
}




/*------------------------------------------------------------------------------------------------------*/

// admin pop ups below... (HEENA)