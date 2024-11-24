// client settings methods


/*----------------------------------------------------------------------------------------------------------------------*/

// Load client settings and populate the fields
async function loadClientSettings() {
    const clientId = document.getElementById('client-settings').dataset.id; // Get client ID

    try {
        // Fetch client data
        const response = await fetch(`/api/client-settings/${clientId}`);
        if (!response.ok) throw new Error(`Failed to load client settings. Status: ${response.status}`);

        const data = await response.json();

        // Update 
        document.getElementById("name-display").innerText = data.name || "N/A";
        document.getElementById("name-input").value = data.name || "";

        document.getElementById("email-display").innerText = data.email || "N/A";
        document.getElementById("email-input").value = data.email || "";

        document.getElementById("phone-display").innerText = data.phone || "N/A";
        document.getElementById("phone-input").value = data.phone || "";

        document.getElementById("password-display").innerText = data.password || "N/A";
        document.getElementById("password-input").value = data.password || "";
    } catch (error) {
        console.error("Error loading client settings:", error.message);
        alert("Could not load client settings. Please try again.");
    }
}




/*----------------------------------------------------------------------------------------------------------------------*/

// Function to make only the paragraph text editable
function editInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('.editable');
    field.contentEditable = true;
    field.focus();
}


/*----------------------------------------------------------------------------------------------------------------------*/

// Function to save the edited text
async function saveInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('.editable');
    const fieldName = field.getAttribute('data-field');
    const updatedValue = field.innerText.trim();

    const clientId = document.getElementById('client-settings').dataset.id;

    const payload = { [fieldName]: updatedValue };

    console.log("Sending payload to server:", payload);

    try {
        const response = await fetch(`/api/client-settings/${clientId}`, { 
            method: 'POST', 
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
