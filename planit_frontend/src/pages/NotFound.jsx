import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-7xl font-bold text-teal-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>

        <p className="mt-2 text-gray-600 max-w-md">Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">Go Back Home</Link>
    </div>
  )
}
