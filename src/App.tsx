import { Switch, Route } from 'wouter'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Grading from '@/pages/Grading'
import Apply from '@/pages/Apply'
import Login from '@/pages/Login'
import Admin from '@/pages/Admin'
import Upload from '@/pages/Upload'
import TermsAccept from '@/pages/TermsAccept'
import Enterprise from '@/pages/buyers/Enterprise'
import Wholesale from '@/pages/buyers/Wholesale'
import Resellers from '@/pages/buyers/Resellers'
import ProductDetail from '@/pages/ProductDetail'
import Portal from '@/pages/Portal'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Quote from '@/pages/Quote'
import QuotePayment from '@/pages/QuotePayment'
import QuotePaymentSuccess from '@/pages/QuotePaymentSuccess'
import QuotePaymentCancel from '@/pages/QuotePaymentCancel'
import WholesaleIPads from '@/pages/landing/WholesaleIPads'
import BulkIPhones from '@/pages/landing/BulkIPhones'
import TabletsForBusiness from '@/pages/landing/TabletsForBusiness'
import AppleDevicesForBusiness from '@/pages/landing/AppleDevicesForBusiness'
import BulkIPadsForBusiness from '@/pages/landing/BulkIPadsForBusiness'

export default function App() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/upload/:token" component={Upload} />
      <Route path="/terms-accept" component={TermsAccept} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/quote-payment" component={QuotePayment} />
      <Route path="/quote-payment-success" component={QuotePaymentSuccess} />
      <Route path="/quote-payment-cancel" component={QuotePaymentCancel} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/grading" component={Grading} />
            <Route path="/apply" component={Apply} />
            <Route path="/login" component={Login} />
            <Route path="/portal" component={Portal} />
            <Route path="/quote" component={Quote} />
            <Route path="/wholesale-ipads" component={WholesaleIPads} />
            <Route path="/bulk-iphones" component={BulkIPhones} />
            <Route path="/tablets-for-business" component={TabletsForBusiness} />
            <Route path="/apple-devices-for-business" component={AppleDevicesForBusiness} />
            <Route path="/bulk-ipads-for-business" component={BulkIPadsForBusiness} />
            <Route path="/buyers/enterprise" component={Enterprise} />
            <Route path="/buyers/wholesale" component={Wholesale} />
            <Route path="/buyers/resellers" component={Resellers} />
            <Route path="/catalog/:rest*" component={ProductDetail} />
            <Route>
              <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#1e3a5f]">404</h1>
                <p className="mt-4 text-gray-500">Page not found.</p>
              </div>
            </Route>
          </Switch>
        </Layout>
      </Route>
    </Switch>
  )
}