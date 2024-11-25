
// Fill the bills table using the database (for clients)
async function fetchBills() {
    try {
        const response = await fetch('http://localhost:3000/api/service-bills');
        if (!response.ok) {
            throw new Error('Bills Unavailable');
        }

        const requests = await response.json();
        const tableBody = document.getElementById('bills-table-body');

        tableBody.innerHTML = '';

        // Fill table with requested services from the database
        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.service_request_id}</td>
                <td>${request.amount}</td>
                <td>${request.DATE}</td>
                <td id="status-${request.id}">${request.STATUS}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching bills:', error);
    }
}




// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded. Fetching bills...");
    fetchBills();
});
