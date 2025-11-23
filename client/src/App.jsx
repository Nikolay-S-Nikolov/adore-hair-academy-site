import { Route, Routes } from 'react-router'

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Courses from './components/courses/Courses.jsx'
import About from './components/about/About.jsx'

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/about' element={<About />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App
