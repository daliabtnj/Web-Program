// methods to manage services for admin side

/*----------------------------------------------------------------------------------------------------------------------*/
// Function to make the text editable
function editService(button) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3');
    const serviceDescription = parent.querySelector('p');
    const serviceHeader = parent.querySelector('h4');
    const serviceListItems = parent.querySelectorAll('ul li'); 

// Make each section editable and add a class for styling
if (serviceTitle) {
    serviceTitle.contentEditable = true;
    serviceTitle.classList.add('editing-header');
    }

    if (serviceDescription) {
    serviceDescription.contentEditable = true;
    serviceDescription.classList.add('editing-paragraph');
    }

    if (serviceHeader) {
    serviceHeader.contentEditable = true;
    serviceHeader.classList.add('editing-header');
    }

   // Make all list items editable and add a class for styling
    serviceListItems.forEach(item => {
    item.contentEditable = true;
    item.classList.add('editing-list');
    });
}


/*----------------------------------------------------------------------------------------------------------------------*/

// Function to save the edited text (just for frontend purposes)
function saveService(button) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3');
    const serviceDescription = parent.querySelector('p');
    const serviceHeader = parent.querySelector('h4');
    const serviceList = parent.querySelector('ul');

    if (serviceTitle) {
        serviceTitle.contentEditable = false;
        serviceTitle.classList.remove('editing-header');
    }

    if (serviceDescription) {
        serviceDescription.contentEditable = false;
        serviceDescription.classList.remove('editing-paragraph');
    }

    if (serviceHeader) {
        serviceHeader.contentEditable = false;
        serviceHeader.classList.remove('editing-header');
    }

    if (serviceList) {
        serviceList.contentEditable = false;
        serviceList.classList.remove('editing-box');

        // Loop through each list item and remove empty ones
        const listItems = serviceList.querySelectorAll('li');
        listItems.forEach(item => {
            if (item.textContent.trim() === "") {
                item.remove(); // Remove empty list items
            } else {
                item.contentEditable = false;
                item.classList.remove('editing-list');
            }
        });
    }

    alert("Service updated (not persisted in backend).");
}


/*----------------------------------------------------------------------------------------------------------------------*/

// Function to add a new service and insert it above the add service box
function addService() {
    // Get values from the input fields
    const serviceName = document.getElementById('new-service-name').value;
    const serviceDescription = document.getElementById('new-service-description').value;
    const servicePrice = document.getElementById('new-service-price').value;

    // Validate input
    if (serviceName && serviceDescription && servicePrice && !isNaN(servicePrice)) {
        // Send data to the backend via fetch
        fetch(`http://localhost:3000/addservice?service_name=${encodeURIComponent(serviceName)}&description=${encodeURIComponent(serviceDescription)}&default_price=${encodeURIComponent(servicePrice)}`)
            .then(response => response.text())
            .then(data => {
                alert("New service added to the database!");

                // Optionally add the new service to the frontend dynamically
                const newServiceHTML = `
                <div class="service-item">
                    <h3 class="editable" contenteditable="false">${serviceName}</h3>
                    <p class="editable" contenteditable="false">${serviceDescription}</p>
                    <p><strong>Price:</strong> $${servicePrice}</p>
                    <button onclick="editService(this)">EDIT SERVICE</button>
                    <button onclick="saveService(this)">SAVE SERVICE</button>
                    <button onclick="deleteService(this)">DELETE SERVICE</button>
                    <hr>
                </div>`;

                // Insert the new service above the "Add Service" box
                const addServiceBox = document.getElementById('add-service-box');
                addServiceBox.insertAdjacentHTML('beforebegin', newServiceHTML);

                // Clear input fields
                document.getElementById('new-service-name').value = '';
                document.getElementById('new-service-description').value = '';
                document.getElementById('new-service-price').value = '';
            })
            .catch(err => {
                console.error("Error adding service:", err);
                alert("Failed to add service. Please try again.");
            });
    } else {
        alert("Please fill in all fields correctly.");
    }
}



/*----------------------------------------------------------------------------------------------------------------------*/

// Function to delete a service
function deleteService(button) {
    const parent = button.parentNode;
    const confirmation = confirm("Are you sure you want to delete this service?");
    if (confirmation) {
        parent.remove();
        alert("Service deleted (not persisted in backend).");
    }
}