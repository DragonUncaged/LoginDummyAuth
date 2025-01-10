# Next.js Login System

This project implements a complete login system with a responsive login page and protected routes. It integrates authentication using the [dummyjson.com API](https://dummyjson.com), handles form validation, stores authentication data in `localStorage`, and ensures a seamless user experience with smooth transitions and responsive design.

---

## Features

### Routing and Protection
- **Login Page**: `/auth/login`
- **Home Page**: `/home` (Protected route requiring authentication)
- **Protected Routes**:
  - Uses a `ProtectedRoute` component.
  - Redirects unauthenticated users to `/auth/login`.
- **Auto-login**: Automatically logs in users by checking `localStorage` on page load.
- **Logout Functionality**:
  - Clears `localStorage` data.
  - Redirects to `/auth/login`.

### Authentication
- **Global Authentication State**:
  - Managed using `AuthContext`.
- **Persistent Login**:
  - Auth token and user data are stored in `localStorage`.
- **API Integration**:
  - Endpoint: `https://dummyjson.com/auth/login`
  - Method: `POST`
  - Headers: `{ 'Content-Type': 'application/json' }`
  - Body: `{ username, password }`
- **Successful Login**:
  - Stores auth token and user data in `localStorage`.
  - Redirects to `/home`.
- **Logout**:
  - Clears auth data from `localStorage`.
  - Redirects to `/auth/login`.

### Login Form
- **Validation Rules**:
  - **Username**: Only accepts "emilys".
    - Error: `"Username must be 'emilys'"`
  - **Email**: Must match a valid email format (e.g., `example@gmail.com`).
    - Error: `"Please enter a valid email address"`
  - **Password**: Minimum 8 characters.
    - Error: `"Password must be at least 8 characters long"`
- **Features**:
  - "Remember Me" checkbox for persistent login.
  - Social login buttons for Google and Facebook (UI only).
  - "Forgot Password" and "Register" links (UI only).
  - Field-specific icons for better UX.
  - Loading state during API calls.
  - Toast notifications for success/error messages.

### Styling
- Fully responsive design:
  - **Desktop**: (1024px and above)
  - **Tablet**: (768px to 1023px)
  - **Mobile**: (below 768px)
- Smooth transitions and hover effects.
- Clean, modern UI matching the provided design.

### Error Handling
- Validation error messages displayed below respective fields.
- API error handling with relevant error messages.
- Loading states during API requests.

---

## Folder Structure
/public /images favicon.ico
/src /components ProtectedRoute.jsx /context AuthContext.jsx /pages Home.jsx Login.jsx
App.jsx globals.css


---

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   git clone <repository-url>
   cd <repository-folder>
   
Install dependencies: Make sure you have npm or yarn installed, then run:

npm install
Run the development server:

npm run dev
Your app should now be running at http://localhost:3000.

### How to Test the Login System
- Login:
- Username: emilys
- Email: Any valid email (e.g., test@example.com)
- Password: At least 8 characters long.
- After a successful login, you will be redirected to the Home Page (/home).

### Logout:
- Click the Logout button on the Home Page.
- You will be redirected to the Login Page (/auth/login).

### Auto-login:
- Refresh the page after logging in.
- The app checks for auth data in localStorage and redirects you to the Home Page.

### File Descriptions

App.jsx
-Main app entry point where routes and the authentication context are set up.

AuthContext.jsx
- Manages authentication state globally using React Context.
- Provides methods to log in, log out, and check authentication state.

ProtectedRoute.jsx
- Wrapper component for protecting routes.
- Ensures user authentication before granting access to protected pages.

Login.jsx
- Login form page.
- Handles form validation, submission, and API integration.
Displays error messages for invalid input.

Home.jsx
- Home page accessible only to authenticated users.
- Displays the user’s profile information and a logout button.
