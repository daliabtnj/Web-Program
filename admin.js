// Hardcoded examples of admins, business info, service, requests, and bills strings for testing

const adminAccounts = [
    { email: "admin@email.com", password: "password"},
    { email: "admin2@email.com", password: "password2"}
];

let businessInfo = {
    companyName: "Company Name",
    companyDescription: "This generic company does ........................",
    logo: "logo.png",
    address: "123 Generic Street, Generic City, GIC G4C",
    phone: "123-456-7890"
};

let services = [
    {id: 1, serviceName: "Service 1", serviceDescription: "This service can be used to................", price: 500},
    {id: 2, serviceName: "Service 2", serviceDescription: "This service can be used to................", price: 100},
    {id: 3, serviceName: "Service 3", serviceDescription: "This service can be used to................", price: 800},
    {id: 4, serviceName: "Service 4", serviceDescription: "This service can be used to................", price: 490}
];

// ------------------------------------------- Admin Login ------------------------------------------------
function loginAdmin(event) {
    event.preventDefault();

    // Inputed email & password
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Check if the inputted username & password corresponds to a valid admin
    const validAdmin = adminAccounts.find(account => account.email === emailInput && account.password === passwordInput);

    if (validAdmin) {
        window.location.href = 'admin-dashboard.html'; // Leads to admin dashboard
    } else {
        alert("Incorrect email or password.");
    }
}

// ----------------------------------------- Business Settings --------------------------------------------
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

// Function to make only the paragraph text editable
function editInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    serviceDescription.contentEditable = true;
    serviceDescription.classList.add('editable-box'); 
    serviceDescription.focus();
}

    // Function to save the edited text (just for frontend purposes)
    function saveInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    serviceDescription.contentEditable = false;
    serviceDescription.classList.remove('editable-box'); 
    alert("Information updated (not persisted in backend).");
}

// ------------------------------------------------ Services ------------------------------------------------

// Display services
function displayServices() {
    const servicesContainer = document.getElementById('services-container');

    // Clear previous services if any
    servicesContainer.innerHTML = '';

    services.forEach(service => {
        // Create a container for each service
        let serviceDiv = document.createElement('div');
        serviceDiv.innerHTML = `
            <h3>${service.serviceName}</h3>
            <p>${service.serviceDescription}</p>
            <p>Price: $${service.price}</p>
            <button onclick="bookService(${service.id})">BOOK SERVICE</button>
            <hr>
        `;
        servicesContainer.appendChild(serviceDiv);
    });
}

// Add Services
function addService() {
    let newServiceName = document.getElementById('newServiceName').value;
    let newServicePrice = document.getElementById('newServicePrice').value;

    services.push({
        id: services.length + 1,
        serviceName: newServiceName,
        serviceDescription: `Description for ${newServiceName}`,
        price: newServicePrice
    });

    alert("Service added");
    displayServices(); // Refresh the service list after adding
}

// Edit Services
function editService() {
    let serviceToModify = parseInt(document.getElementById('serviceId').value);
    let newServiceName = document.getElementById('serviceName').value;
    let newServicePrice = document.getElementById('servicePrice').value;

    // Find the service to modify
    const serviceIndex = services.findIndex(service => service.id === serviceToModify);

    if (serviceIndex !== -1) {
        // Modify service information
        services[serviceIndex].serviceName = newServiceName;
        services[serviceIndex].price = newServicePrice;

        alert("Service updated.");
        displayServices(); // Refresh the service list after editing
    } else {
        alert("Service not found.");
    }
}

// Delete Service
function deleteService() {
    let serviceToDelete = parseInt(document.getElementById('serviceId').value);

    // Find the service to delete
    const serviceIndex = services.findIndex(service => service.id === serviceToDelete);

    if (serviceIndex !== -1) {
        services.splice(serviceIndex, 1); // Remove service
        alert("Service deleted.");
        displayServices(); // Refresh the service list after deleting
    } else {
        alert("Service not found.");
    }
}

// Function to book a service (for demonstration purposes)
function bookService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        alert(`You have booked ${service.serviceName} for $${service.price}.`);
    }
}

// Call displayServices on page load
window.onload = displayServices;