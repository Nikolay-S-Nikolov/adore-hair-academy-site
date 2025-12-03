import { Route, Routes } from 'react-router'

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Courses from './components/courses/Courses.jsx'
import About from './components/about/About.jsx'
import Products from './components/products/Products.jsx'
import Contact from './components/contact/Contact.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import Logout from './components/auth/Logout.jsx'
import GuestRoute from './guards/GuestRoute.jsx';
import ProtectedRoute from './guards/ProtectedRoute.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import StudentDashboard from './components/dashboard/StudentDashboard.jsx'
import AdminDashboard from './components/admin-dashboard/AdminDashboard.jsx'
import AdminRoute from './guards/AdminRoute.jsx'
import AdminCourses from './components/admin-dashboard/admin-courses/AdminCourses.jsx'
import CourseDetails from './components/courses/curse-details/CourseDetails.jsx'
import EnrollmentForm from './components/courses/enrollment-form/EnrollmentForm.jsx'
import AdminEnrollments from './components/admin-dashboard/аdmin-еnrollments/AdminEnrollments.jsx'
import AdminResources from './components/admin-dashboard/admin-resources/AdminResources.jsx'

function App() {


  return (
    <>
      <ToastProvider>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/courses' element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/courses/:courseId/enroll" element={<ProtectedRoute><EnrollmentForm /></ProtectedRoute>} />

          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
          <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
          <Route path='/logout' element={<Logout />} />

          <Route path='/dashboard' element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />

          <Route path='/admin' element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
          <Route path="/admin/courses" element={<AdminRoute> <AdminCourses /> </AdminRoute>} />
          <Route path="/admin/enrollments" element={<AdminRoute> <AdminEnrollments /> </AdminRoute>} />
          <Route path="/admin/resources" element={<AdminRoute> <AdminResources /> </AdminRoute>} />
        </Routes>

        <Footer />
      </ToastProvider>
    </>
  )
}

export default App
