import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search, Home, Bookmark, Settings, User, LogIn,
    Menu, FileText, X, LogOut, Film
} from "lucide-react";
import { useAuth } from "./AuthContext"; 

function Navbar() {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { user, logout } = useAuth();

    const getActiveTab = () => {
        if (location.pathname === "/" || location.pathname === "/home") return "home";
        if (location.pathname === "/post") return "post";
        if (location.pathname === "/bookmarks") return "bookmarks";
        if (location.pathname === "/reels") return "reels";
        return "";
    };

    const activeTab = getActiveTab();

    const handleLogout = () => {
        logout();
        navigate("/");
        setShowMobileMenu(false);
    };

    return (
        <div className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
            <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500"></div>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to={user ? "/home" : "/"}>
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>

                        <div className="hidden md:block ml-4">
                            <div className="relative rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="block w-56 pl-10 pr-4 py-2 text-sm bg-transparent text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                        </div>
                    </div>

                    {showSearch && (
                        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
                            <div className="relative rounded-md bg-gray-100">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="block w-full pl-10 pr-10 py-2 text-sm bg-transparent text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                <button
                                    onClick={() => setShowSearch(false)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <X className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    )}

                    {user && (
                        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl">
                            <div className="flex space-x-1">
                                <Link
                                    to="/home"
                                    className={`px-10 py-4 flex items-center justify-center border-b-2 ${activeTab === "home" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                >
                                    <Home className="h-6 w-6" />
                                </Link>
                                <Link
                                    to="/post"
                                    className={`px-10 py-4 flex items-center justify-center border-b-2 ${activeTab === "post" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                >
                                    <FileText className="h-6 w-6" />
                                </Link>
                                <Link
                                    to="/bookmarks"
                                    className={`px-10 py-4 flex items-center justify-center border-b-2 ${activeTab === "bookmarks" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                >
                                    <Bookmark className="h-6 w-6" />
                                </Link>
                                <Link 
                                to="/reels"
                                className={`px-10 py-4 flex items-center justify-center border-b-2 ${activeTab === "reels" ? "border-green-500 text-green-600 " : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                >
                                    <Film className="h-6 w-6" />
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
                            >
                                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
                            {user ? (
                                <>
                                    <Link
                                        to="/settings"
                                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                        title="Settings"
                                    >
                                        <Settings className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                        title="Profile"
                                    >
                                        {user.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt="Profile"
                                                className="h-6 w-6 rounded-full"
                                            />
                                        ) : (
                                            <User className="h-5 w-5" />
                                        )}
                                        <span className="ml-1 text-sm">{user.name}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                        title="Logout"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/"
                                    className="flex items-center text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-colors"
                                >
                                    <LogIn className="h-4 w-4 mr-1" />
                                    Login
                                </Link>
                            )}
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showMobileMenu && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {user ? (
                            <>
                                <Link
                                    to="/home"
                                    className="flex items-center px-3 py-2 rounded-md text-green-600 font-medium"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    <Home className="h-5 w-5 mr-3" />
                                    Home
                                </Link>
                                <Link
                                    to="/post"
                                    className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    <FileText className="h-5 w-5 mr-3" />
                                    Post
                                </Link>
                                <Link
                                    to="/bookmarks"
                                    className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    <Bookmark className="h-5 w-5 mr-3" />
                                    Bookmarks
                                </Link>
                                <Link to="/reels"
                                className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                onClick={() => setShowMobileMenu (false)}
                                >
                                <Film className="h-6 w-5 mr-3" />
                                Reels
                                </Link>
                                <div className="border-t border-gray-200 pt-2">
                                    <Link
                                        to="/settings"
                                        className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <Settings className="h-5 w-5 mr-3" />
                                        Settings
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <User className="h-5 w-5 mr-3" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                    >
                                        <LogOut className="h-5 w-5 mr-3" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/"
                                className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-800 font-medium"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                <LogIn className="h-5 w-5 mr-3" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;