// Function to make the text editable
function editService(button) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3');
    const serviceDescription = parent.querySelector('p');
<<<<<<< HEAD
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

=======
    const priceElement = parent.querySelector('.price'); // Assuming you have a price element
    button.textContent = "SAVE SERVICE"; // Change button text to "SAVE SERVICE"
    button.setAttribute("onclick", "saveService(this)"); // Change button functionality to saveService

    // Make elements editable
    if (serviceTitle) {
        serviceTitle.contentEditable = true;
        serviceTitle.classList.add('editing-header');
    }

    if (serviceDescription) {
        serviceDescription.contentEditable = true;
        serviceDescription.classList.add('editing-paragraph');
    }

    if (priceElement) {
        priceElement.contentEditable = true;
        priceElement.classList.add('editing-paragraph');
    }
}


/*----------------------------------------------------------------------------------------------------------------------*/

// Function to save the edited service
function saveService(button) {
    const parent = button.parentNode;
    const serviceId = parent.getAttribute('data-id'); // Assuming service ID is stored in a data attribute
    const serviceTitle = parent.querySelector('h3').textContent.trim();
    const serviceDescription = parent.querySelector('p').textContent.trim();
    const servicePrice = parseFloat(parent.querySelector('.price').textContent.trim().replace('$', ''));

    // Validate fields
    if (!serviceTitle || !serviceDescription || isNaN(servicePrice)) {
        alert("All fields must be filled out correctly.");
        return;
    }

    // Send updated data to the backend using PUT request
    fetch(`http://localhost:3000/api/update-service/${serviceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            service_name: serviceTitle,
            description: serviceDescription,
            default_price: servicePrice,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update service.");
            }
            return response.json();
        })
        .then((data) => {
            alert("Service updated successfully!");
            button.textContent = "EDIT SERVICE"; // Change button text back to "EDIT SERVICE"
            button.setAttribute("onclick", "editService(this)"); // Reset button functionality to editService

            // Make elements non-editable
            parent.querySelector('h3').contentEditable = false;
            parent.querySelector('p').contentEditable = false;
            parent.querySelector('.price').contentEditable = false;

            // Remove styling
            parent.querySelector('h3').classList.remove('editing-header');
            parent.querySelector('p').classList.remove('editing-paragraph');
            parent.querySelector('.price').classList.remove('editing-paragraph');
        })
        .catch((error) => {
            console.error("Error updating service:", error);
            alert("Failed to update the service. Please try again.");
        });
}


/*----------------------------------------------------------------------------------------------------------------------*/

>>>>>>> 05332eba9344d9bce9f3b588d5589273094dd087
// Function to add a new service and insert it above the add service box
function addService() {
    const serviceName = document.getElementById('new-service-name').value;
    const serviceDescription = document.getElementById('new-service-description').value;
<<<<<<< HEAD

    if (serviceName && serviceDescription) {
        const newServiceHTML = `
        <div class="service-item">
            <h3 class="editable" contenteditable="false">${serviceName}</h3>
            <p class="editable" contenteditable="false">${serviceDescription}</p>
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

        alert("New service added (not persisted in backend).");
    } else {
        alert("Please fill in both fields.");
    }
}

// Function to delete a service
function deleteService(button) {
    const parent = button.parentNode;
    const confirmation = confirm("Are you sure you want to delete this service?");
    if (confirmation) {
        parent.remove();
        alert("Service deleted (not persisted in backend).");
    }
}
=======
    const servicePrice = document.getElementById('new-service-price').value;

    if (serviceName && serviceDescription && servicePrice && !isNaN(servicePrice)) {
        fetch("http://localhost:3000/api/addservice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                service_name: serviceName,
                description: serviceDescription,
                default_price: servicePrice,
            }),
        })
            .then(response => response.json()) // Handle JSON response
            .then(data => {
                // Dynamically add the new service to the frontend
                const newServiceHTML = `
                <div class="service-item" data-id="${data.id}">
                    <h3 class="editable" contenteditable="false">${data.service_name}</h3>
                    <p class="editable" contenteditable="false">${data.description}</p>
                    <p><strong>Price:</strong> $${data.default_price}</p>
                    <button onclick="editService(this)">EDIT SERVICE</button>
                    <button onclick="saveService(this)">SAVE SERVICE</button>
                    <button onclick="deleteService(this)">DELETE SERVICE</button>
                    <hr>
                </div>`;
                
                const addServiceBox = document.getElementById('add-service-box');
                addServiceBox.insertAdjacentHTML('beforebegin', newServiceHTML);

                // Clear input fields
                document.getElementById('new-service-name').value = '';
                document.getElementById('new-service-description').value = '';
                document.getElementById('new-service-price').value = '';

                alert("Service added successfully!");
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
    const serviceId = parent.getAttribute('data-id'); // Assuming service ID is stored in a `data-id` attribute

    const confirmation = confirm("Are you sure you want to delete this service?");
    if (confirmation) {
        // Send delete request to backend
        fetch(`http://localhost:3000/api/delete-service/${serviceId}`)
            .then(response => response.text())
            .then(data => {
                alert("Service deleted from the database!");

                // Remove the service from the frontend
                parent.remove();
            })
            .catch(err => {
                console.error("Error deleting service:", err);
                alert("Failed to delete service. Please try again.");
            });
    }
}




/*----------------------------------------------------------------------------------------------------------------------*/

// Function to fetch and display all services
function loadServices() {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = ''; // Clear existing content

    fetch('http://localhost:3000/api/services')
        .then(response => response.json())
        .then(services => {
            services.forEach(service => {
                const serviceHTML = `
                    <div class="service-item" data-id="${service.id}">
                        <h3 class="editable" contenteditable="false">${service.service_name}</h3>
                        <p class="editable" contenteditable="false">${service.description}</p>
                        <p><strong>Price:</strong> $<span class="editable price" contenteditable="false">${service.default_price}</span></p>
                        <button onclick="editService(this)">EDIT SERVICE</button>
                        <button onclick="saveService(this)">SAVE SERVICE</button>
                        <button onclick="deleteService(this)">DELETE SERVICE</button>
                        <hr>
                    </div>`;
                servicesContainer.insertAdjacentHTML('beforeend', serviceHTML);
            });
        })
        .catch(err => {
            console.error('Error fetching services:', err);
            alert('Failed to load services.');
        });
}

// Call the function to load services on page load
document.addEventListener('DOMContentLoaded', loadServices);
>>>>>>> 05332eba9344d9bce9f3b588d5589273094dd087
