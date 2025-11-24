import { Route, Routes } from 'react-router'

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Courses from './components/courses/Courses.jsx'
import About from './components/about/About.jsx'
import Products from './components/products/Products.jsx'
import Contact from './components/contact/Contact.jsx'
import Register from './components/register/Register.jsx'

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App
