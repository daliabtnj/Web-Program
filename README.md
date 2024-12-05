Here's the updated `README.md` with the backend implementation details included:

---

# Web Program Project

## Overview

This project develops a full-stack web-based system for service companies, enabling clients to manage accounts and request services while allowing administrators to manage offerings and track service histories.

<img width="1680" alt="Screenshot 2024-12-05 at 12 15 30 AM" src="https://github.com/user-attachments/assets/3a80731c-011f-4455-ab5e-38556c78417e">


## Team Members

- Dalia Betinjaneh (40200966)
- Mariana Bou-Saleh (40227084)
- Victor Romano Franca (40228849)
- Heena Patel (40247513)

## Technologies

- **HTML**, **CSS**, **JavaScript**, **Node.js**, **Express**, **MySQL**, **phpMyAdmin**, **Git**

## Features

Welcome to ServiceHub, a versatile platform that allows any company to use it as a template to showcase their services. Here, we are using the example of "Service Website" as a demonstration company using the platform to display their services.

### Logged Out: 
Through the home page, logged-out website users can access:
- **Services**: See all services provided and book service (redirects to sign-in for booking).
- **Home Page**: Introduction to the website.
- **About Us**: Learn more about ServiceHub.
- **Contact Us**: Provides information to allow users to contact ServiceHub.
- **Log in**: Sign in as admin or client using predefined credentials, or sign up:
  1. **Admin email**:        admin@email.com  
     **Admin password**:     password  
  2. **Client email**:       johndoe@gmail.com  
     **Client password**:    password123!  

### Admin Side Use:
Admins can sign up and log in to:
- **Manage Services**: Add, edit, or delete services based on their current offerings.
- **Manage Business Settings**: Update company information such as name, email, phone number, logo URL, and address to maintain a customized template.
- **Monitor Bills**: View paid and unpaid bills of clients.
- **Manage Client Requests**: Access client information, including name, chosen service, cost, and booking date.

### Client Side Use:
Clients can sign up and log in to:
- **View Services**: Browse and book available services with confirmation.
- **Manage Personal Information**: Update details like name, email, phone number, and password.
- **View Bills**: Track bills associated with booked services.
- **View Requests**: Browse through their current/past bookings.

### Overall Purpose:
ServiceHub acts as a template-based platform (like Moodle) for multiple companies to post their services and information. Clients can easily book services specific to each company on the platform.

---

## Backend Implementation

### Features:
- **Node.js** with **Express** is used to handle the backend server.
- **MySQL** is used for database management with `phpMyAdmin` as an interface.
- RESTful API endpoints manage:
  - Admin and client authentication.
  - CRUD operations for services and business settings.
  - Booking and viewing requests for clients and admins.
- **LocalStorage** is used to persist the `client_id` for personalized client-side data.

### Backend Routes:
1. **Admin Routes:**
   - `/api/signup-admin`: Admin sign-up.
   - `/api/signin-admin`: Admin sign-in.
   - `/api/manage-services`: Add, edit, delete services.
   - `/api/service-requests`: View all client requests.

2. **Client Routes:**
   - `/api/signup-client`: Client sign-up.
   - `/api/signin-client`: Client sign-in.
   - `/api/get-client-requests`: Fetch client-specific requests.
   - `/api/book-service`: Book a service.
   - `/api/delete-request/:id`: Cancel a booking request.

3. **Shared Routes:**
   - `/api/business-settings`: View or update company business settings.

---

## Database Setup

### Prerequisites:
- **MySQL Server** installed locally.
- **phpMyAdmin** for database management.

### Steps:
1. Open **phpMyAdmin**.
2. Create a new database named `service_hub_db`.
3. Import the `database/service_hub_db.sql` file included in this project.
4. Update the database connection details in `server.js` to match your local MySQL setup:
   ```javascript
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'yourpassword',
       database: 'service_hub_db',
   });
   ```
5. Run the backend server using the command:
   ```bash
   node server.js
   ```

### Testing:
- Open the browser and navigate to [http://localhost:3000](http://localhost:3000) while the server is running.
- Ensure the backend is functional by testing routes using Postman or through the frontend.

---

## Running the Website Locally

### Frontend:
1. Install **Live Server Extension** in VS Code:
   - Open VS Code.
   - Go to Extensions (`Ctrl+Shift+X`).
   - Search for "Live Server" and click **Install**.
2. Open your project in VS Code.
3. Right-click on the `index.html` file and select **Open with Live Server**.

### Backend:
1. Ensure the database is set up and the backend server is running.
2. Navigate to [http://localhost:3000](http://localhost:3000) to use the website.
