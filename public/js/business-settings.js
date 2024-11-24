// business settings methods


/*----------------------------------------------------------------------------------------------------------------------*/

// Load business settings and populate the fields
async function loadBusinessSettings() {
    try {
        const response = await fetch('/api/business-settings');
        const data = await response.json();

        // Populate the fields
        document.querySelector('[data-field="company_name"]').innerText = data.company_name;
        document.querySelector('[data-field="address"]').innerText = data.address;
        document.querySelector('[data-field="email"]').innerText = data.email;
        document.querySelector('[data-field="phone"]').innerText = data.phone;
    } catch (error) {
        console.error("Error loading business settings:", error);
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


// Function to save the edited text (just for frontend purposes)
async function saveInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('.editable');
    const fieldName = field.getAttribute('data-field');
    const updatedValue = field.innerText.trim();

    const payload = { [fieldName]: updatedValue };

    console.log("Sending payload to server:", payload);

    try {
        const response = await fetch('/api/business-settings', {
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
            alert("Failed to update business settings.");
        }
    } catch (error) {
        console.error(`Error updating ${fieldName}:`, error);
        alert("An error occurred while updating the settings.");
    }
}


/*----------------------------------------------------------------------------------------------------------------------*/

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadBusinessSettings);
