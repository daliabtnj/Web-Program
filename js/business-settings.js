// Function to make only the paragraph text editable
function editInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    serviceDescription.contentEditable = true;
    serviceDescription.classList.add('editable-box'); 
    serviceDescription.focus();
}

function saveInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    const newValue = serviceDescription.textContent;

    serviceDescription.contentEditable = false;
    serviceDescription.classList.remove('editable-box'); 

    // Check if we're updating the company name
    if (parent.querySelector('h3').textContent === 'Company Name:') {
        fetch('http://localhost:3000/api/settings/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ companyName: newValue }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update company name.');
                }
                return response.text();
            })
            .then((data) => {
                alert('Company name updated successfully!');
            })
            .catch((error) => {
                console.error(error);
                alert('An error occurred while updating the company name.');
            });
    }
}


function editBusinessInfo(event) {
    event.preventDefault();

    // Input changes
    let newCompanyName = document.getElementById('companyName').value;
    let newLogo = document.getElementById('logo').value;
    let newAddress = document.getElementById('address').value;
    let newPhone = document.getElementById('phone').value;

    // Change the business information
    businessInfo.companyName = newCompanyName;
    businessInfo.logo = newLogo;
    businessInfo.address = newAddress;
    businessInfo.phone = newPhone;

    alert("Business information has been updated.");
}
