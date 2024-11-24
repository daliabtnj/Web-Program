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
                        <option value="booked" ${request.status === 'booked' ? 'selected' : ''}>Booked</option>
                        <option value="pending" ${request.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="completed" ${request.status === 'completed' ? 'selected' : ''}>Completed</option>
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