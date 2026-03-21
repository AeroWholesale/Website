import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/_pages/Home'
import Catalog from '@/_pages/Catalog'
import About from '@/_pages/About'
import Contact from '@/_pages/Contact'
import Grading from '@/_pages/Grading'
import Apply from '@/_pages/Apply'
import Login from '@/_pages/Login'
import Admin from '@/_pages/Admin'
import Upload from '@/_pages/Upload'
import TermsAccept from '@/_pages/TermsAccept'
import Enterprise from '@/_pages/buyers/Enterprise'
import Wholesale from '@/_pages/buyers/Wholesale'
import Resellers from '@/_pages/buyers/Resellers'
import Healthcare from '@/_pages/Healthcare'
import ProductDetail from '@/_pages/ProductDetail'
import Portal from '@/_pages/Portal'
import ForgotPassword from '@/_pages/ForgotPassword'
import ResetPassword from '@/_pages/ResetPassword'
import Quote from '@/_pages/Quote'

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/upload/:token" element={<Upload />} />
      <Route path="/terms-accept" element={<TermsAccept />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:rest*" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/grading" element={<Grading />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/buyers/enterprise" element={<Enterprise />} />
        <Route path="/buyers/wholesale" element={<Wholesale />} />
        <Route path="/buyers/resellers" element={<Resellers />} />
        <Route path="/industries/healthcare" element={<Healthcare />} />
        <Route path="*" element={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-[#1e3a5f]">404</h1>
            <p className="mt-4 text-gray-500">Page not found.</p>
          </div>
        } />
      </Route>
    </Routes>
  )
}
