// Function to edit a service
function editService(button, id) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3');
    const serviceDescription = parent.querySelector('p:nth-of-type(1)');
    const servicePrice = parent.querySelector('p:nth-of-type(2)');

    // Make editable
    serviceTitle.contentEditable = true;
    serviceDescription.contentEditable = true;
    servicePrice.contentEditable = true;

    serviceTitle.classList.add('editing');
    serviceDescription.classList.add('editing');
    servicePrice.classList.add('editing');
}


/*----------------------------------------------------------------------------------------------------------------------*/

// Function to save a service
async function saveService(button, id) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3').textContent.trim();
    const serviceDescription = parent.querySelector('p:nth-of-type(1)').textContent.trim();
    const servicePrice = parent.querySelector('p:nth-of-type(2)').textContent.replace('Price: $', '').trim();

    if (serviceTitle && serviceDescription && servicePrice) {
        try {
            const response = await fetch(`/update-service/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_name: serviceTitle,
                    description: serviceDescription,
                    default_price: servicePrice
                })
            });

            if (response.ok) {
                alert('Service updated successfully');
                loadServices(); // Reload services
            } else {
                alert('Error updating service');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('All fields must be filled out');
    }
}



/*----------------------------------------------------------------------------------------------------------------------*/

// Function to add a new service
async function addService() {
    const serviceName = document.getElementById('new-service-name').value.trim();
    const serviceDescription = document.getElementById('new-service-description').value.trim();
    const defaultPrice = document.getElementById('new-service-price').value.trim();

    if (serviceName && serviceDescription && defaultPrice) {
        try {
            const response = await fetch('/add-service', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_name: serviceName,
                    description: serviceDescription,
                    default_price: defaultPrice
                })
            });

            if (response.ok) {
                alert('Service added successfully');
                loadServices(); // Reload the services
            } else {
                alert('Error adding service');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please fill in all fields');
    }
}



/*----------------------------------------------------------------------------------------------------------------------*/

// Function to delete a service
async function deleteService(button, id) {
    const confirmation = confirm('Are you sure you want to delete this service?');
    if (confirmation) {
        try {
            const response = await fetch(`/delete-service/${id}`, {
                method: 'GET'
            });

            if (response.ok) {
                alert('Service deleted successfully');
                button.parentNode.remove(); // Remove service from DOM
            } else {
                alert('Error deleting service');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}






/*----------------------------------------------------------------------------------------------------------------------*/
// Function to load services from the backend
async function loadServices() {
    try {
        const response = await fetch('/services'); // Call the backend endpoint
        if (response.ok) {
            const services = await response.json(); // Parse the JSON response
            console.log(services); // Log the services for debugging
            displayServices(services); // Call another function to display the services (see below)
        } else {
            console.error("Failed to fetch services.");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// Function to display services in the HTML
function displayServices(services) {
    const container = document.getElementById('service-container');
    container.innerHTML = ''; // Clear any existing content

    services.forEach(service => {
        const serviceHTML = `
            <div class="service-item">
                <h3>${service.service_name}</h3>
                <p>${service.description}</p>
                <p>Price: $${service.default_price}</p>
                <button onclick="editService(this)">EDIT SERVICE</button>
                <button onclick="saveService(this, ${service.id})">SAVE SERVICE</button>
                <button onclick="deleteService(this, ${service.id})">DELETE SERVICE</button>
                <hr>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', serviceHTML); // Append the service HTML
    });
}

// Automatically load services when the page loads
window.addEventListener('DOMContentLoaded', loadServices);




