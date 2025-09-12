import { Link } from "react-router-dom";
import {
    Home,
    Bookmark,
    Settings,
    User,
    FileText,
    Heart,
    MessageCircle,
    Share2,
    Mail,
    Search
} from "lucide-react";
import { useState } from "react";

function Footer() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-10 w-auto mb-4"
                            />
                        </Link>
                        <p className="text-gray-600 text-sm mb-6">
                            Connecting people through shared stories and experiences. Join our community today.
                        </p>

                        <div className="mb-4">
                            <form onSubmit={handleSearch} className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-2 text-sm bg-gray-100 text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white"
                                />
                                <button
                                    type="submit"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500 hover:text-green-600"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </form>
                        </div>

                        <p className="text-xs text-gray-500">
                            Stay updated with the latest content
                        </p>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">NAVIGATION</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <Home className="h-4 w-4 mr-2" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/post" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Posts
                                </Link>
                            </li>
                            <li>
                                <Link to="/bookmarks" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    Bookmarks
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">SUPPORT</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/help" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/community" className="text-gray-600 hover:text-green-500 text-sm flex items-center">
                                    <Heart className="h-4 w-4 mr-2" />
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">LEGAL</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/privacy" className="text-gray-600 hover:text-green-500 text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-600 hover:text-green-500 text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="text-gray-600 hover:text-green-500 text-sm">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/guidelines" className="text-gray-600 hover:text-green-500 text-sm">
                                    Community Guidelines
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Socio-Book. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/settings" className="text-gray-500 hover:text-green-500 text-sm flex items-center">
                            <Settings className="h-4 w-4 mr-1" />
                            Settings
                        </Link>
                        <Link to="/" className="text-gray-500 hover:text-green-500 text-sm">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;