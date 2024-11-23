// Fetch existing business settings
async function loadBusinessSettings() {
    const response = await fetch('/api/business-settings');
    const data = await response.json();

    // Populate fields
    document.querySelector('.editable[contenteditable=false]').innerText = data.company_name;
    // Populate other fields similarly
}


// Function to make only the paragraph text editable
function editInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    serviceDescription.contentEditable = true;
    serviceDescription.classList.add('editable-box'); 
    serviceDescription.focus();
}

// Save updated business settings
async function saveInformation(button) {
    const parent = button.parentNode;
    const field = parent.querySelector('p');
    const fieldName = field.getAttribute('data-field'); // Add a data-field attribute for identification

    const updatedValue = field.innerText;

    // Prepare payload
    const payload = {};
    payload[fieldName] = updatedValue;

    // Send update request
    await fetch('/api/business-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    alert("Business settings updated!");
}

