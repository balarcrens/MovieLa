import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './Components/Pages/Home'
import Footer from './Components/Footer'

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
            <Footer />
        </>
    )
}