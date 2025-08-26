import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Pages/Home'
import Footer from './Components/Footer'
import TelegramFloat from './Components/TelegramFloat'
import MovieDetail from './Components/Pages/MovieDetail'
import AddMovie from './Components/Pages/AddMovie'
import AdminLogin from './Components/Pages/AdminLogin'
import AdminDashboard from './Components/Pages/AdminDashboard'
import CategoryMovies from './Components/Pages/CategoryMovies'
import MovieRequest from './Components/Pages/MovieRequest'
import { Toaster } from 'react-hot-toast'
import HowToDownload from './Components/Pages/HowToDownload'

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/category/:category' element={<CategoryMovies />} />
                <Route path='/movie/:slug' element={<MovieDetail />} />
                <Route path='/movie/how-to-download' element={<HowToDownload />} />
                <Route path='/movierequest' element={<MovieRequest />} />
                <Route path='/movie/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/movie/admin/login' element={<AdminLogin />} />
                <Route path='/movie/admin/add' element={<AddMovie />} />
            </Routes>
            <TelegramFloat />
            <Toaster position="top-right" reverseOrder={false} />
            <Footer />
        </>
    )
}