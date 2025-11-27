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
import { ToastProvider } from './context/ToastContext.jsx'

function App() {


  return (
    <>
      <ToastProvider>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />

          <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
          <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />

          <Route path='/logout' element={<Logout />} />
        </Routes>

        <Footer />
      </ToastProvider>
    </>
  )
}

export default App
