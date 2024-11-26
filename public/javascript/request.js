// FRONT END JAVASCRIPT FOR ADMIN MANAGE REQUESTS & BILLS

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Fill the requests table using the database (for admins)
async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/api/service-requests');
        console.log('Fetch Requests Response:', response); // Log the response object

        if (!response.ok) {
            throw new Error('Service Requests Unavailable');
        }

        const requests = await response.json();
        const tableBody = document.getElementById('requests-table-body-admin');

        tableBody.innerHTML = '';

        // Fill table with requested services from the database
        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.client_id}</td>
                <td>${request.service_id}</td>
                <td id="status-${request.id}">
                    <select id="status-select-${request.id}" onchange="updateStatus(${request.id})">
                        <option value="Booked" ${request.status === 'Booked' ? 'selected' : ''}>Booked</option>
                        <option value="Pending" ${request.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${request.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
                <td>${request.date}</td>
                <td>
                      <button 
                        class="cancel-service-button" 
                        onclick="cancelRequest(${request.id})"
                        ${request.status !== 'booked' ? 'pending' : ''}>
                        Cancel
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
        alert('3- Failed to load requests. Please try again.');
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Change the status

async function updateStatus(id) {
    const select = document.getElementById(`status-select-${id}`);
    const status = select.value;

    console.log('Updating status for ID:', id);  
    console.log('Selected status:', status);    

    try {
        const response = await fetch(`/api/service-requests/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        console.log('Response status:', response.status);  
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update status: ${response.status}, Details: ${errorText}`);
        }

        alert('Status updated successfully!');
        fetchRequests(); // Refresh requests
    } catch (error) {
        console.error('Error updating status:', error.message);
        alert('Failed to update status. Check console for details.');
    }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Cancel requests and delete from database
async function cancelRequest(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/delete-request/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Service was not delete. Details: ${errorDetails}`);
        }

        alert('Request deleted successfully!');
        fetchRequests(); // Refresh the table
    } catch (error) {
        console.error('Error deleting request:', error.message);
        alert('Failed to delete the request. Please check the console for details.');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded. Fetching requests...");
    fetchRequests();
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// filter request by client id
async function fetchClientRequests(clientId) {
    try {
        const response = await fetch('http://localhost:3000/api/service-requests');
        const allRequests = await response.json();
        const clientRequests = allRequests.filter(req => req.client_id === clientId);

        const tableBody = document.getElementById('requests-table-body');
        tableBody.innerHTML = '';

        clientRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.service_id}</td>
                <td>${request.status}</td>
                <td>${request.date}</td>
                <td><button onclick="cancelRequest(${request.id})">Cancel</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching client requests:", error);
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
async function bookService(serviceId) {
    const clientId = getClientId(); // Replace with the logged-in client ID
    const requestBody = {
        client_id: clientId,
        service_id: serviceId,
        status: 'Pending',
        date: new Date().toISOString(),
    };
    console.log('Booking Request Body:', requestBody); // Log the request body debug

    try {
        const response = await fetch('/api/book-service', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        console.log('Booking Response:', response); // Log the response object debug


        if (response.ok) {
            const responseData = await response.json();
            console.log('Booking Response Data:', responseData); // Log the JSON response debug
            alert('Service booked successfully!');
        } else {
            const errorDetails = await response.text();
            console.error("Failed to book service:", errorDetails);

        }
    } catch (error) {
        console.error("Error booking service:", error);
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// dynamically populate the "My Requests" table in customer-requests.html
async function fetchClientRequests(clientId) {
    try {
        const response = await fetch('http://localhost:3000/api/service-requests');
        if (!response.ok) throw new Error('Failed to fetch requests');

        const allRequests = await response.json();
        const clientRequests = allRequests.filter(request => request.client_id === clientId);

        const tableBody = document.getElementById('requests-table-body');
        tableBody.innerHTML = ''; // Clear existing rows

        clientRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.service_id}</td>
                <td>${request.status}</td>
                <td>${request.date}</td>
                <td><button onclick="cancelRequest(${request.id})">Cancel</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching client requests:', error);
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialize the page based on the user's role (admin or client)
document.addEventListener('DOMContentLoaded', () => {
    const adminTableBody = document.getElementById('requests-table-body-admin');
    const clientTableBody = document.getElementById('requests-table-body');

    if (adminTableBody) fetchRequests(); // Admin view
    if (clientTableBody) fetchClientRequests(getClientId()); // Client view
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Utility function to fetch the logged-in client ID
function getClientId() {
    // Replace this with the actual logic to fetch the client ID (e.g., from session storage, cookies, or backend)
    return 1; // Default client ID for testing
}

