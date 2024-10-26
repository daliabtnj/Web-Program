// Function to make the text editable
function editService(button) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3');
    const serviceDescription = parent.querySelector('p');

    serviceTitle.contentEditable = true;
    serviceDescription.contentEditable = true;
    serviceTitle.focus();
}

// Function to save the edited text (just for frontend purposes)
function saveService(button) {
    const parent = button.parentNode;
    const serviceTitle = parent.querySelector('h3');
    const serviceDescription = parent.querySelector('p');

    serviceTitle.contentEditable = false;
    serviceDescription.contentEditable = false;
    alert("Service updated (not persisted in backend).");
}

// Function to add a new service and insert it above the add service box
function addService() {
    const serviceName = document.getElementById('new-service-name').value;
    const serviceDescription = document.getElementById('new-service-description').value;

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
