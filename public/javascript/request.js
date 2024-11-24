// FRONT END JAVASCRIPT FOR ADMIN MANAGE REQUESTS & BILLS

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Fill the requests table using the database (for admins)
async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/api/service-requests');
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
                        <option value="Booked" ${request.status === 'booked' ? 'selected' : ''}>Booked</option>
                        <option value="Pending" ${request.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${request.status === 'completed' ? 'selected' : ''}>Completed</option>
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
        alert('Failed to load requests. Please try again.');
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Change the status (Requests) NOT WORKING YET
async function updateStatus(id) {
    const select = document.getElementById(`status-select-${id}`);
    const status = select.value;

    // Log the selected status to check what value is being passed
    console.log('Selected status:', status);  // Debugging line

    // Validate that the status is one of the allowed values
    const validStatuses = ["Completed", "Booked", "Pending"];
    if (!validStatuses.includes(status)) {
        console.log('Invalid status:', status);  // Debugging line
        alert('Invalid status selected!');
        return;
    }

    try {
        const response = await fetch(`/api/service-requests/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }), // Send the status in the request body
        });

        // Check if the response is OK
        console.log('Response status:', response.status);  // Debugging line
        if (!response.ok) {
            throw new Error(`Failed to update status: ${response.status}`);
        }

        alert('Status updated successfully!');
        fetchRequests(); // Refresh requests to reflect the change
    } catch (error) {
        console.error('Error updating status:', error.message);
        alert('Failed to update status. Please check the console for details.');
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