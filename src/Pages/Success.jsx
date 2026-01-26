import { useLocation } from "react-router-dom"


export default function Success() {
   const location = useLocation()
   const {orderId, customerName,phone, address,createdAt}= location.state || {}
  return (
   <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-2xl px-4 2xl:px-0">
      <h2 className="text-xl font-semibold text-orange-700  sm:text-2xl mb-2">{customerName} Thanks for your order!</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Your order <a href="#" class="font-medium text-gray-900 dark:text-white hover:underline">{orderId}</a> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
      <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{createdAt|| new Date().toLocaleDateString()}</dd>
          </dl>
          
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{customerName}</dd>
          </dl>
          
          <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">+{phone}</dd>
          </dl>
      </div>
      <div className="flex items-center space-x-4">
          <a href="/" className="text-white bg-orange-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-primary-800">Continue Shopping</a>
        
      </div>
  </div>
</section>
  )
}
