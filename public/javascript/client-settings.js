// client settings methods 


/*----------------------------------------------------------------------------------------------------------------------*/
// Enable editing of a specific field
function editInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('.editable');
    field.contentEditable = true;
    field.focus();
}
/*----------------------------------------------------------------------------------------------------------------------*/

// Load client settings and populate the fields
async function loadClientSettings() {
    const clientId = document.getElementById('client-settings').dataset.id; // Get client ID from the top-level div

    try {
        const response = await fetch(`/api/client-settings/${clientId}`); // Use the correct endpoint
        if (!response.ok) throw new Error("Failed to load client settings.");

        const data = await response.json();

        // Populate the fields
        document.querySelector('[data-field="name"]').innerText = data.name;
        document.querySelector('[data-field="email"]').innerText = data.email;
        document.querySelector('[data-field="phone"]').innerText = data.phone;
        document.querySelector('[data-field="password"]').innerText = data.password;
    } catch (error) {
        console.error("Error loading client settings:", error);
        alert("Could not load client settings. Please try again.");
    }
}



/*----------------------------------------------------------------------------------------------------------------------*/

// Function to save the edited text
async function saveInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('.editable');
    const fieldName = field.getAttribute('data-field');
    const updatedValue = field.innerText.trim();

    const clientId = document.getElementById('client-settings').dataset.id; // Get client ID

    const payload = { [fieldName]: updatedValue };

    console.log("Sending payload to server:", payload);

    try {
        const response = await fetch(`/api/client-settings/${clientId}`, { // Include client ID in the endpoint
            method: 'POST', // Use POST or PUT based on backend implementation
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert(`${fieldName} updated successfully!`);
            field.contentEditable = false;
        } else {
            const errorText = await response.text();
            console.error("Error response from server:", errorText);
            alert("Failed to update client settings.");
        }
    } catch (error) {
        console.error(`Error updating ${fieldName}:`, error);
        alert("An error occurred while updating the settings.");
    }
}


/*----------------------------------------------------------------------------------------------------------------------*/
    
    // Initialize on page load
document.addEventListener('DOMContentLoaded', loadClientSettings);
