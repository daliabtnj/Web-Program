/*------------------------------------------------------------------------------------------------------*/
// signup confirmation for client
// JavaScript to validate email and show confirmation pop-up

// Function to check for missing "@" in the email and show confirmation pop-up
// Function to check for missing "@" in the email and show confirmation pop-up


/*------------------------------------------------------------------------------------------------------*/
// signup confirmation for admin



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