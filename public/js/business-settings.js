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


// Enable editing of a specific field
function editInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('.editable');
    field.contentEditable = true;
    field.focus();
}

/*----------------------------------------------------------------------------------------------------------------------*/


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

// Function to trigger the file input for logo upload
function triggerLogoUpload() {
    const fileInput = document.getElementById('logo-upload');
    fileInput.click(); // Open the file picker
}

// Function to save the uploaded logo
// Function to save the uploaded logo
function saveLogo() {
    const fileInput = document.getElementById('logo-upload');
    const file = fileInput.files[0]; // Get the selected file

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append('logo', file);

    fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to upload logo.");
            }
            return response.json();
        })
        .then(data => {
            alert("Logo uploaded successfully!");

            // Update the logo in the header dynamically
            const rightLogoElement = document.querySelector('.header-right-logo');
            if (rightLogoElement) {
                rightLogoElement.src = data.logo_url; // Update the right logo URL dynamically
            }

            // Clear the file input
            fileInput.value = "";
        })
        .catch(error => {
            console.error("Error uploading logo:", error);
            alert("Error uploading logo.");
        });
}

function removeLogo() {
    if (!confirm("Are you sure you want to remove the right-side logo?")) return;

    fetch('/api/remove-logo', {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to remove logo.");
            }
            return response.json();
        })
        .then(data => {
            alert("Logo removed successfully!");

            // Update the frontend to reflect no logo
            const rightLogoElement = document.querySelector('.header-right-logo');
            if (rightLogoElement) {
                rightLogoElement.src = ""; // Remove the logo
            }

            // Clear the database value in the UI
            const logoField = document.querySelector('[data-field="right_logo"]');
            if (logoField) {
                logoField.textContent = "No logo set";
            }
        })
        .catch(error => {
            console.error("Error removing logo:", error);
            alert("Error removing logo.");
        });
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', loadBusinessSettings);

