/*------------------------------------------------------------------------------------------------------*/

// Booking confirmation for client with message and date/time
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




/*------------------------------------------------------------------------------------------------------*/

// admin pop ups below... (HEENA)