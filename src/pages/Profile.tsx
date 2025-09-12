import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    User,
    MapPin,
    Calendar,
    Link as LinkIcon,
    Edit3,
    Eye
} from "lucide-react";

function Profile() {
    type UserType = {
        id: string | number;
        name: string;
        email: string;
        bio?: string;
        location?: string;
        website?: string;
        profilePicture?: string;
        joinDate?: string;
    };

    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [otherUsers, setOtherUsers] = useState<UserType[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        bio: "",
        location: "",
        website: ""
    });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (loggedInUser) {
            setCurrentUser(loggedInUser);
            setEditForm({
                name: loggedInUser.name || "",
                bio: loggedInUser.bio || "",
                location: loggedInUser.location || "",
                website: loggedInUser.website || ""
            });

            const filteredUsers = allUsers.filter((user: { id: string | number; }) => user.id !== loggedInUser.id);
            setOtherUsers(filteredUsers);
        }
    }, []);

    const handleSaveProfile = () => {
        const updatedUser = {
            ...currentUser,
            ...editForm,
            id: currentUser!.id,
            email: currentUser!.email,
            profilePicture: currentUser!.profilePicture,
            joinDate: currentUser!.joinDate
        };

        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = allUsers.map((user: { id: string | number; }) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setIsEditing(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800">No user logged in</h2>
                    <p className="text-gray-600 mt-2">Please sign in to view your profile</p>
                    <Link
                        to="/login"
                        className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-12">
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    {/* Cover Photo */}
                    <div className="h-40 bg-gradient-to-r from-green-400 to-green-500"></div>

                    <div className="px-6 pb-6">
                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between -mt-16 mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                                    {currentUser.profilePicture ? (
                                        <img
                                            src={currentUser.profilePicture}
                                            alt={currentUser.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                                    <p className="text-gray-600">{currentUser.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
                            >
                                <Edit3 className="h-4 w-4 mr-2" />
                                {isEditing ? "Cancel Editing" : "Edit Profile"}
                            </button>
                        </div>

                        {isEditing ? (
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={editForm.bio}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={editForm.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={editForm.website}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        ) : (
                            <div className="mt-6">
                                {(currentUser.bio || currentUser.location || currentUser.website) && (
                                    <div className="mb-6">
                                        {currentUser.bio && <p className="text-gray-700 mb-3">{currentUser.bio}</p>}

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            {currentUser.location && (
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span>{currentUser.location}</span>
                                                </div>
                                            )}

                                            {currentUser.website && (
                                                <div className="flex items-center">
                                                    <LinkIcon className="h-4 w-4 mr-1" />
                                                    <a
                                                        href={currentUser.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-500 hover:underline"
                                                    >
                                                        {currentUser.website}
                                                    </a>
                                                </div>
                                            )}

                                            {currentUser.joinDate && (
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    <span>Joined {new Date(currentUser.joinDate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-6 text-sm">
                                    <div>
                                        <span className="font-semibold">{otherUsers.length}</span>
                                        <span className="text-gray-600 ml-1">People</span>
                                    </div>

                                    <div>
                                        <span className="font-semibold">
                                            {JSON.parse(localStorage.getItem('posts') || '[]')
                                                .filter((post: { authorId: string | number; }) => post.authorId === currentUser.id).length}
                                        </span>
                                        <span className="text-gray-600 ml-1">Posts</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">People You May Know</h2>

                    {otherUsers.length === 0 ? (
                        <div className="text-center py-8">
                            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No other users found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {otherUsers.map(user => (
                                <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            {user.profilePicture ? (
                                                <img
                                                    src={user.profilePicture}
                                                    alt={user.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-6 w-6 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>

                                    {user.bio && (
                                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{user.bio}</p>
                                    )}

                                    <Link
                                        to={`/user/${user.id}`}
                                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Profile
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;