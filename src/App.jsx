import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './Components/Pages/Home'
import Footer from './Components/Footer'
import TelegramFloat from './Components/TelegramFloat'
import MovieDetail from './Components/Pages/MovieDetail'

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<MovieDetail />} />
            </Routes>
            <TelegramFloat />
            <Footer />
        </>
    )
}