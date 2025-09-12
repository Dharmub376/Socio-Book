import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Error404 = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="text-center">
                <h1 className="text-[10rem] md:text-[15rem] font-bold text-gray-800 mb-4 leading-none">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors duration-300 text-lg"
                >
                    <Home className="h-5 w-5 mr-2" />
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default Error404;