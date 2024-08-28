---

# GMADP Donations App

## Overview

The GMADP Donations App is a web application designed to manage donations for the GMADP organization. This app includes functionalities such as user authentication, managing donations, generating custom receipts, and administrative controls. The frontend is built with TypeScript and Tailwind CSS, the backend utilizes MongoDB and Express.js, and the authentication is handled by NextAuth. The application is thoroughly tested, achieving 93% coverage using Jest.

## Features

- **User Authentication:** Secure login and registration using NextAuth, with support for credentials-based authentication.
- **Manage Donations:** Users can add, delete, view, and search donations efficiently.
- **Custom Receipts:** Generate custom donation receipts in PDF format using pdfMake.
- **Admin Controls:** Admin users have the ability to add new users to the system.
- **Responsive Design:** The UI is fully responsive and styled using Tailwind CSS.
- **Extensive Testing:** The app is covered by comprehensive tests, achieving 93% code coverage using Jest.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Express.js, MongoDB
- **Authentication:** NextAuth.js
- **PDF Generation:** pdfMake
- **Testing:** Jest

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/gmadp-donations-app.git
   cd gmadp-donations-app
   ```

2. **Install Node modules:**

   Install the required Node.js dependencies using npm:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   MONGO_DB_CONNECTION_STRING=your_mongodb_connection_string
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

### Running Tests

To run the tests and check the code coverage:

```bash
npm run test
```

This will execute the Jest test suite, and you can view the coverage report to ensure that the tests are comprehensive.

### Admin Setup

To add an admin user, you can use the admin interface to create a new user with admin privileges. Ensure that the necessary admin roles are assigned to manage users within the app.

## Usage

- **Donations Management:** After logging in, users can add new donations, view existing ones, delete donations, and search through the donations list.
- **Receipt Generation:** On the donations page, click on the "Generate Receipt" button to download a custom PDF receipt for any donation.
- **Admin Controls:** Admin users can navigate to the admin panel to add new users to the system.

---
