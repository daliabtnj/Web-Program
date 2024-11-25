// admin-bills.js


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Fill the bills table using the database (for admins)
async function fetchBills() {
    try {
        const response = await fetch('http://localhost:3000/api/service-bills');
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Bills Unavailable');
        }

        const requests = await response.json();
        console.log('Fetched bills data:', requests);

        const tableBody = document.getElementById('admin-bills-table-body');
        if (!tableBody) {
            throw new Error('Table body element not found');
        }

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
// Change the status of the bills



// TEMP ONE
async function updateBillStatus(id) {
    const select = document.getElementById(`status-select-${id}`);
    const status = select ? select.value : null;

    console.log('Dropdown select:', select);
    console.log('Selected status:', status);

    if (status !== 'unpaid' && status !== 'paid') {
        alert('Invalid status selected. Please choose either "unpaid" or "paid".');
        return;
    }

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

        alert('Status updated successfully!');
        fetchBills();
    } catch (error) {
        console.error('Error updating status:', error.message);
        alert('Failed to update status. Check console for details.');
    }
}
/*
async function updateBillStatus(id) {
    const select = document.getElementById(`status-select-${id}`);
    const status = select.value;

    console.log('Updating status for ID:', id);  
    console.log('Selected status:', status);

    // Validate status value (can only be "unpaid" or "paid")
    if (status !== 'unpaid' && status !== 'paid') {
        alert('Invalid status selected. Please choose either "unpaid" or "paid".');
        return;  // Exit if invalid status
    }

    try {
        const response = await fetch(`/api/service-bills/${id}`, { // Route matches server-side
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
        fetchBills(); // Refresh the bills table after update
    } catch (error) {
        console.error('Error updating status:', error.message);
        alert('Failed to update status. Check console for details.');
    }
}
*/





// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded. Fetching bills...");
    fetchBills();
});
