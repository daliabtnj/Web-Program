// Hardcoded examples of admins, business info, service, requests, and bills strings for testing

const adminAccounts = [
    { email: "admin@email.com", password: "password" },
    { email: "admin2@email.com", password: "password2" }
];

let businessInfo = {
    companyName: "Company Name",
    companyDescription: "This generic company does ........................",
    logo: "logo.png",
    address: "123 Generic Street, Generic City, GIC G4C",
    phone: "123-456-7890"
};

let services = [
    { id: 1, serviceName: "Service 1", serviceDescription: "This service can be used to................", price: 500 },
    { id: 2, serviceName: "Service 2", serviceDescription: "This service can be used to................", price: 100 },
    { id: 3, serviceName: "Service 3", serviceDescription: "This service can be used to................", price: 800 },
    { id: 4, serviceName: "Service 4", serviceDescription: "This service can be used to................", price: 490 }
];

// ------------------------------------------- Admin Login ------------------------------------------------
// function loginAdmin(event) {
//     event.preventDefault();

//     // Inputed email & password
//     const emailInput = document.getElementById('email').value;
//     const passwordInput = document.getElementById('password').value;

//     // Check if the inputted username & password corresponds to a valid admin
//     const validAdmin = adminAccounts.find(account => account.email === emailInput && account.password === passwordInput);

//     if (validAdmin) {
//         saveAdmin();
//         window.location.href = 'admin-dashboard.html'; // Leads to admin dashboard
//     } else {
//         alert("Incorrect email or password.");
//     }
// }

function signInAdmin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!email || !password) {
        document.getElementById('error').innerText = "Email and password are required.";
        return;
    }

    // POST request to the server
    axios.post('http://localhost:3000/signin-admin', {
        email: email,
        password: password
    })
        .then((response) => {
            // Handle success
            console.log("Sign-in success:", response.data.message);
            saveAdmin();
            window.location.href = 'admin-dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            // Handle error
            console.error("Sign-in error:", error.response ? error.response.data.error : error.message);
            document.getElementById('error').innerText = error.response?.data?.error || "An error occurred. Please try again.";
        });
};

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

// ------------------------------------------------ Services ------------------------------------------------


// Add Services
/*function addService() {
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
}*/


// Error Handling and Form Validation for clients
document.addEventListener('DOMContentLoaded', () => {

    // Sign-Up Page required information
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const password_repeat = document.getElementById('password-repeat');

    // Get sign up form for client
    const clientSignUpForm = document.getElementById('client-sign-up-form');

    // Get sing in form for client 
    const clientSignInForm = document.getElementById('client-sign-in-form');

    // Sign-Up Form Validation and error handling
    if (clientSignUpForm) {
        clientSignUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            // If the password does not match the password confirmation, throw error
            if (password_repeat.value != password.value) {
                errorMessages.push('Passwords do not match.');
                console.log(errorMessages)
            }

            // If there are any errors with the Sign Up screen, display them
            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ');
            }

            // Redirects if sign up successful and pushes new user to users array
            else {
                console.log("Form is valid. Redirecting...");
                signUPCustomer();
                window.location.href = "customer-dashboard.html";   // Redirect to customer dashboard

            }
        });
    }


    // Sign-In Form Validation and error handling
    function signInCustomer() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Clear any previous error message
        document.getElementById('error').innerText = "";

        // POST request to the server
        axios.post('http://localhost:3000/signin-client', {
            email: email,
            password: password
        })
            .then((response) => {
                // Handle success
                console.log(response.data.message);
                alert("Sign-in successful!");
                window.location.href = 'customer-dashboard.html'; // Redirect to dashboard
            })
            .catch((error) => {
                // Handle error
                console.error(error.response ? error.response.data.error : error.message);
                document.getElementById('error').innerText = error.response?.data?.error || 'An error occurred. Please try again.';
            });
    }
});



// Call displayServices on page load
window.onload = displayServices;
