- [x] Added html and css resources
- [x] Create react base project inside client folder `npm create vite@latest .`
- [x] Add components Header, Home and Footer
- [x] Add responsive Header menu functionality
- [x] Setup React router `npm i react-router`
- [x]  Add Routes
- [x]  Add Courses component and css
- [x]  Add About component and css
- [x]  Add Contact component and css
- [x]  Add Product component and css
- [x]  Add Contact send email functionality
- [x]  Add Register component and css
- [x]  Add Login component and css
- [x]  Add Logout component and css
- [x]  Add toast context and hook
- [x]  Add GlobalToast component, toast context and hook
- [x]  Add GuestRoute guard
- [x]  Add ProtectedRoute guard
- [x]  Add Dashboard component
- [x]  Update dashboard with static data
- [x]  Add Course details  component and css
- [x]  Add AdminResources, ResourceCard,ResourceForm, ResourceList and AdminResources.module.css for admin CRUD operations

# Adore Hair Academy — React Application

A modern single-page application built with **React 19 + Vite**, designed for a real-world hairdressing academy.
The project includes authentication, admin panel, course management, review system, protected routes, global toast notifications, and a scalable architecture prepared for student dashboards and online exams.

This repository contains the frontend application in folder client, which communicates with a backend in folder server (SoftUni Practice Server Collections REST Service).


## Project Overview

**Adore Hair Academy** is a modern React project created as a web platform for a hairdressing academy.

### Main goals of the application:

- Present academy courses with detailed information
- User registration and login
- **Admin Panel** for course management (create, edit, delete)
- **Review System** - users can leave reviews for courses
- **Enrollment System** - user course enrollment
- Foundation for future Student Dashboard, exam system, and learning resources

## Live Demo

**Frontend:** [Deployed on Vercel](https://adore-hair-academy-site.vercel.app/) *(https://adore-hair-academy-site.vercel.app/)*

**Backend:** [Deployed on Render](https://adore-hair-academy-server.onrender.com/) *(https://adore-hair-academy-server.onrender.com/)*

### Test Admin Account

For testing admin functionalities, use these credentials:

```
Email: admin@abv.bg
Password: admin
```

admin dashboard route `/admin`

**Note:** This account has full admin privileges and can access the Admin Panel to create, edit, and delete courses.

---



## Features

### Authentication

- Register / Login / Logout for user authentication
- Token-based sessions stored in `localStorage`
- `AuthContext` + `useAuth` custom hook
- Auto-remove invalid tokens
- Route guards:
    - `ProtectedRoute` (for authenticated users)
    - `GuestRoute` (for guests)
    - `AdminRoute` (for admin)
- Admin role detection and authorization

### Routing

- React Router
- Redirect logic
- Custom guard flow

### Courses Module
- Public course listing (Beginner and Advanced )
- Course details page with full information

### Review Course
- Leave reviews for courses (authenticated users only)
- Edit your own reviews with modal dialog
- Delete reviews with confirmation
- Real-time validation

### Enrollment System
- Course enrollment form
- User data collection (name and phone number)
- Success/error toast notifications
- Form validation

### Admin Panel 
**Admin-only area**, accessible only to users with admin privileges
**Access:** Login with `admin@abv.bg` / `admin` to access the Admin Panel `/admin`.

### Custom Hooks Included
- `useAuth()` — authentication state management
- `useToast()` — global toast notification API
- `useAdminApi()` — admin API interactions
- `useCourseApi()` — course-related API calls
- `useFormAction()` — React 19 friendly form automation with `useActionState`
- `useLocalStorage()` — persistent state (planned for student dashboard)

### Global Toast System
Global toast notification system:
- `success` - green success messages
- `error` - red error messages
- `warning` - yellow warning messages
- Auto-hide after 4 seconds
- Can be called from anywhere using `useToast()`



## Installation and Runnign the Application

To run the application you will need Node installed.
Open Your terminal and run.
```
git clone https://github.com/Nikolay-S-Nikolov/adore-hair-academy-site

```

Navigate to the client directory and install the dependencies
```
cd client
npm install
```

Run the client application in development
```
npm run dev
```

Navigate to the server directory and run the server
```
node server.js
```

## 🧪 Upcoming Features

Planned improvements:

### Student Dashboard
- Enrolled courses information
- Upcoming exams
- Downloadable resources

### Online Exam Module
- Multiple choice exams
- Automatic grading
- Exam timer
- Results history

### Resource Library
- PDF files
- Videos
- Learning materials
- Categorization by courses

### Staff Panel
- Student management
- Results review
- Request approval/rejection
- Statistics

### Notifications System
- Real-time notifications
- Email notifications
- Push notifications

---

## 📸 Screenshots

*Screenshots will be added soon*

### Planned screenshots:
- Home Page
- Courses Page
- Course Details with Reviews
- Admin Panel
- Review Modal
- Toast Notifications
- Mobile Layout

### Home Page
![Home Page]()

### Admin Panel
![Admin Panel]()

### Mobile View
![Mobile View]()

## Unit Testing

