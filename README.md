# Web Program Project

## Overview

This project develops a web-based system for service companies, enabling clients to manage accounts and request services while allowing administrators to manage offerings and track service histories.

## Website Link

[https://daliabtnj.github.io/Web_Program/](https://daliabtnj.github.io/Web_program/)

## Team Members

- Dalia Betinjaneh (40200966)
- Mariana Bou-Saleh (40227084)
- Victor Romano Franca (40228849)
- Heena Patel (40247513)

## Technologies

- **HTML**, **CSS**, **JavaScript**, **Git**

## Features

Welcome to ServiceHub, a versatile platform that allows any company to use it as a template to showcase their services. Here, we are using the example of "Service Website" as a demonstration company using the platform to display their services.

Since we don’t have a database yet, when a client or an admin enters the website, we are considering them already inside “Service Website”. Service Hub is the platform in which later on we will be able to access different company’s websites, when we will implement the backend. 

### Logged out: 
Through the home page, logged out website users can access through the header:
- **Services**: see all services provided and book service, which redirects to sign-in
- **Home page**: introduction to the website
- **About us**: know more about ServiceHub
- **Contact us**: provides info to allow users to contact
- **Log in**:  sign in as admin or client using predefined, or sign up
     1. **Admin email**:        admin@email.com
        **Admin password**:         password
     2. **Client email**:           johndoe@gmail.com
        **Client password**:        password123!

### Admin Side Use:
Admins can sign up and log in to:
- **Manage Services**: Add, edit, or delete services based on their current offerings.
- **Manage Business Settings**: Update company information such as name, email, phone number, logo URL, and address to maintain a customized template.
- **Monitor Bills**: View paid and unpaid bills of clients.
- **Manage Client Requests**: Access client information, including name, chosen service, cost, and booking date.


### Client Side Use:
Clients can sign up and log in to:
- **View Services**: Browse and book available services with confirmation.
- **Manage Personal Information**: Update details like name, email, phone number and password.
- **View Bills**: Track bills associated with booked services.
- **View Requests**: Browse through their current/past bookings.


### Overall Purpose:
ServiceHub acts as a template-based platform (like Moodle) for multiple companies to post their services and information. Clients can easily book services specific to each company on the platform.

## Getting Started

### Prerequisites
- A web browser (e.g., Chrome, Firefox)
- [Visual Studio Code](https://code.visualstudio.com/) installed

### Running the Website Locally
1. **Install Live Server Extension**: 
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
   - Search for "Live Server" and click **Install**.

2. **Open Your Project**:
   - Open the project folder in Visual Studio Code.

3. **Start Live Server**:
   - Right-click on the `index.html` file (or any HTML file) in the Explorer panel.
   - Select **Open with Live Server**. 
   - Your default web browser will open, displaying your website.



For backend purpose

## Database Setup for the admin manage services
1. Open phpMyAdmin
2. Create a new database named `service_hub_db`.
3. Import the `database/service_hub_db.sql` file.
4. Ensure the database connection credentials in `server.js` match your local MySQL setup. (do node server.js)
5. use the url : http://localhost:3000 with your local server running to display the website.
