import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Moon,
    Sun,
    Bell,
    Lock,
    Trash2,
    Eye,
    EyeOff,
    Palette,
    User,
    Globe,
    Shield,
    Download,
    LogOut,
    ChevronRight,
    Check
} from "lucide-react";

type User = {
    id: string | number;
    name: string;
    email: string;
    profilePicture?: string;
};

function Settings() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [settings, setSettings] = useState({
        theme: "light",
        notifications: true,
        emailNotifications: true,
        language: "english",
        autoPlayVideos: false,
        showOnlineStatus: true,
        accountPrivacy: "public"
    });
    const [activeSection, setActiveSection] = useState("appearance");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        const savedSettings = JSON.parse(localStorage.getItem("userSettings") || "null");

        setCurrentUser(user);

        if (savedSettings) {
            setSettings(savedSettings);
            // Apply theme
            document.documentElement.classList.toggle("dark", savedSettings.theme === "dark");
        }
    }, []);

   

    const handlePasswordChange = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        alert("Password changed successfully!");
        setShowPasswordForm(false);
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };


    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Not logged in</h2>
                    <p className="text-gray-600 mt-2">Please sign in to access settings</p>
                    <Link
                        to="/login"
                        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-12">
            <div className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your account preferences</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        {currentUser.profilePicture ? (
                                            <img
                                                src={currentUser.profilePicture}
                                                alt={currentUser.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-5 w-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">{currentUser.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{currentUser.email}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="p-2">
                                {[
                                    { id: "appearance", label: "Appearance", icon: Palette },
                                    { id: "notifications", label: "Notifications", icon: Bell },
                                    { id: "privacy", label: "Privacy & Security", icon: Shield },
                                    { id: "account", label: "Account", icon: User },
                                    { id: "language", label: "Language & Region", icon: Globe }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-md text-left ${activeSection === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        <div className="flex items-center">
                                            <item.icon className="h-5 w-5 mr-3" />
                                            <span>{item.label}</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="w-full mt-4 flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Log Out
                        </button>
                    </div>

                    <div className="lg:w-3/4">
                        {activeSection === "appearance" && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Theme</h3>
                                        <div className="flex gap-4">
                                            <button
                                                className={`flex-1 p-4 border rounded-lg text-center ${settings.theme === "light" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                                            >
                                                <Sun className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                                                <span className="font-medium">Light</span>
                                                {settings.theme === "light" && (
                                                    <div className="mt-2">
                                                        <Check className="h-5 w-5 text-blue-500 mx-auto" />
                                                    </div>
                                                )}
                                            </button>

                                            <button
                                                className={`flex-1 p-4 border rounded-lg text-center ${settings.theme === "dark" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                                            >
                                                <Moon className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                                                <span className="font-medium">Dark</span>
                                                {settings.theme === "dark" && (
                                                    <div className="mt-2">
                                                        <Check className="h-5 w-5 text-blue-500 mx-auto" />
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Font Size</h3>
                                        <div className="flex gap-2">
                                            {["Small", "Medium", "Large"].map((size) => (
                                                <button
                                                    key={size}
                                                    className={`px-4 py-2 border rounded-md `}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "notifications" && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about new posts and messages</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.notifications}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your account</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.emailNotifications}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "privacy" && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Account Privacy</h3>
                                        <div className="flex gap-4">
                                            <button
                                                className={`flex-1 p-4 border rounded-lg text-center border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                                            >
                                                <Eye className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                                                <span className="font-medium">Public</span>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Anyone can see your profile</p>
                                                {settings.accountPrivacy === "public" && (
                                                    <div className="mt-2">
                                                        <Check className="h-5 w-5 text-blue-500 mx-auto" />
                                                    </div>
                                                )}
                                            </button>

                                            <button
                                                className={`flex-1 p-4 border rounded-lg text-center ${settings.accountPrivacy === "private" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                                            >
                                                <EyeOff className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                                                <span className="font-medium">Private</span>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Only approved followers can see your posts</p>
                                                {settings.accountPrivacy === "private" && (
                                                    <div className="mt-2">
                                                        <Check className="h-5 w-5 text-blue-500 mx-auto" />
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Change Password</h3>
                                        {!showPasswordForm ? (
                                            <button
                                                onClick={() => setShowPasswordForm(true)}
                                                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                                            >
                                                <Lock className="h-4 w-4 mr-2" />
                                                Change Password
                                            </button>
                                        ) : (
                                            <form onSubmit={handlePasswordChange} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                <div className="mb-3">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.currentPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.newPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.confirmPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                    >
                                                        Update Password
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswordForm(false)}
                                                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "account" && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Download Your Data</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get a copy of your data including your posts, comments, and account information.</p>
                                        <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                                            <Download className="h-4 w-4 mr-2" />
                                            Request Download
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Delete Account</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Permanently delete your account and all of your content. This action cannot be undone.</p>

                                        {!showDeleteConfirm ? (
                                            <button
                                                className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete Account
                                            </button>
                                        ) : (
                                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                                                <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Are you absolutely sure?</h4>
                                                <p className="text-sm text-red-700 dark:text-red-400 mb-4">This action cannot be undone. This will permanently delete your account and remove all your data from our servers.</p>
                                                
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "language" && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Language & Region</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="nepali">Nepali</option>
                                            <option value="english">English</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Auto-play Videos</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Play videos automatically when scrolling through your feed</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.autoPlayVideos}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                            <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">Delete Account</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Settings;