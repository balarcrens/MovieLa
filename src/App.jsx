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
import FilterMovies from './Components/Pages/FilterMovies'
import PrivacyPolicy from './Components/Pages/PrivacyPolicy'
import TermsConditions from './Components/Pages/TermsConditions'
import ScrollToTop from './Components/ScrollToTop'
import InstallButton from './Components/InstallButton'
import UserRequests from './Components/Pages/UserRequests'

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Header />
            {/* <InstallButton /> */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/category/:category' element={<CategoryMovies />} />
                <Route path='/movie/filter/:filter' element={<FilterMovies />} />
                <Route path='/movie/:slug' element={<MovieDetail />} />
                <Route path='/movie/how-to-download' element={<HowToDownload />} />
                <Route path='/movierequest' element={<MovieRequest />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-conditions' element={<TermsConditions />} />
                <Route path='/movie/admin/login' element={<AdminLogin />} />
                <Route path='/movie/admin' element={<AdminDashboard />} />
                <Route path='/movie/admin/add' element={<AddMovie />} />
                <Route path='/movie/admin/requests' element={<UserRequests />} />
            </Routes>
            <TelegramFloat />
            <Toaster position="top-right" reverseOrder={false} />
            <Footer />
        </>
    )
}