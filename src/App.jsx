import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Pages/Home'
import Footer from './Components/Footer'
import TelegramFloat from './Components/TelegramFloat'
import MovieDetail from './Components/Pages/MovieDetail'
import AddMovie from './Components/Pages/AddMovie'
import AdminLogin from './Components/Pages/AdminLogin'

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<MovieDetail />} />
                <Route path='/movie/addmovie' element={<AddMovie />} />
                <Route path='/movie/admin/login' element={<AdminLogin />} />
            </Routes>
            <TelegramFloat />
            <Footer />
        </>
    )
}