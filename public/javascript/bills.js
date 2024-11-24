// Fill the bills table using the database (for admins)
async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/api/Bills');
        if (!response.ok) {
            throw new Error('Service Bills Unavailable');
        }

        const requests = await response.json();
        const tableBody = document.getElementById('bills-table-body-admin');

        tableBody.innerHTML = '';

        // Fill table with requested services from the database
        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.client_id}</td>
                <td>${request.service_request_id}</td>
                <td>${request.amount}</td>
                <td>${request.date}</td>
                <td id="status-${request.id}">
                    <select id="status-select-${request.id}" onchange="updateStatus(${request.id})">
                        <option value="paid" ${request.status === 'paid' ? 'selected' : ''}>paid</option>
                        <option value="unpaid" ${request.status === 'unpaid' ? 'selected' : ''}>unpaid</option>
                    </select>
                </td>
             
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
        alert('1- Failed to load requests. Please try again.');
    }
}
