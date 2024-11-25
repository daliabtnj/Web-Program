// --------------------------------------------------------------------------------------------------------------------------------------------------------
//  Admin Bills JavaScript 
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Fill the bills table using the database (Admin side)
async function fetchBills() {
    try {
        const response = await fetch('http://localhost:3000/api/service-bills');
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Bills Unavailable');
        }

        const requests = await response.json();

        const tableBody = document.getElementById('admin-bills-table-body');
        if (!tableBody) {
            throw new Error('Table body element not found');
        }

        // Bills Table
        tableBody.innerHTML = '';
        requests.forEach(request => {
            console.log('Processing request:', request); // Log each request
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.client_id}</td>
                <td>${request.service_request_id}</td>
                <td>${request.amount}</td>
                <td>${request.DATE}</td>
                <td id="status-${request.id}">
                <select id="status-select-${request.id}" onchange="updateBillStatus(${request.id})">
                        <option value="unpaid" ${request.STATUS === 'upaid' ? 'selected' : ''}>unpaid</option>
                        <option value="paid" ${request.STATUS === 'paid' ? 'selected' : ''}>paid</option>
                        </select>
                </td>            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching bills:', error);
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Change the status of the bills (paid or unpaid)
async function updateBillStatus(id) {

    const select = document.getElementById(`status-select-${id}`);
    const status = select ? select.value : null;

    try {
        const response = await fetch(`/api/service-bills/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        console.log('Server response:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
        }

        alert('Payment Received!');
        fetchBills();

    } catch (error) {
        console.error('Error status was not updated:', error.message);
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Update the page and load bills
document.addEventListener('DOMContentLoaded', () => {
    console.log("Loading Bills");
    fetchBills();
});
