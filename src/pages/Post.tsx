import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Heart,
    MessageCircle,
    Bookmark,
    MoreHorizontal,
    User,
    Edit,
    Trash2,
    Send,
    ArrowLeft,
    Filter,
    Search,
} from "lucide-react";

// Mock user data
const mockUser = {
    id: "user-1",
    name: "Dharmu",
    profilePicture: null
};

type PostType = {
    id: string;
    content?: string;
    image?: string;
    author?: {
        name?: string;
        id?: string;
    };
    timestamp?: string;
    likes?: { [userId: string]: boolean };
    bookmarks?: { [userId: string]: boolean };
    comments?: Array<{
        id: string;
        text: string;
        author: string;
        userId: string;
        timestamp: string;
    }>;
    likeCount?: number;
};

function Post() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [menuOpen, setMenuOpen] = useState<string | null>(null);
    const [commentText, setCommentText] = useState<string>("");
    const [activeCommentInput, setActiveCommentInput] = useState<string | null>(null);
    const [user] = useState(mockUser);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterBy, setFilterBy] = useState<"all" | "text" | "image">("all"); // all, text, image

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const initializedPosts = savedPosts.map(post => ({
            ...post,
            likes: post.likes || {},
            bookmarks: post.bookmarks || {},
            comments: post.comments || [],
            likeCount: post.likeCount || Object.values(post.likes || {}).filter(Boolean).length
        }));
        setPosts(initializedPosts);
    }, []);

    const handleLike = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const alreadyLiked = post.likes && post.likes[user.id];
                const newLikes = {
                    ...post.likes,
                    [user.id]: !alreadyLiked
                };

                return {
                    ...post,
                    likes: newLikes,
                    likeCount: alreadyLiked ? (post.likeCount || 0) - 1 : (post.likeCount || 0) + 1
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleBookmark = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const alreadyBookmarked = post.bookmarks && post.bookmarks[user.id];

                return {
                    ...post,
                    bookmarks: {
                        ...post.bookmarks,
                        [user.id]: !alreadyBookmarked
                    }
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        const userBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${user.id}`) || '{}');
        if (userBookmarks[postId]) {
            delete userBookmarks[postId];
        } else {
            userBookmarks[postId] = true;
        }
        localStorage.setItem(`bookmarks_${user.id}`, JSON.stringify(userBookmarks));
    };

    const handleAddComment = (postId) => {
        if (!commentText.trim()) return;

        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: Date.now().toString(),
                    text: commentText,
                    author: user.name,
                    userId: user.id,
                    timestamp: new Date().toISOString()
                };

                return {
                    ...post,
                    comments: [...(post.comments || []), newComment]
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setCommentText("");
        setActiveCommentInput(null);
    };

    const handleDelete = (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setMenuOpen(null);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
            return `${diffInMinutes}m ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const toggleMenu = (postId, e) => {
        e.stopPropagation();
        setMenuOpen(menuOpen === postId ? null : postId);
    };

    const hasUserLiked = (post) => {
        return post.likes && post.likes[user.id];
    };

    const hasUserBookmarked = (post) => {
        return post.bookmarks && post.bookmarks[user.id];
    };

    const countLikes = (post) => {
        if (post.likeCount !== undefined) return post.likeCount;
        if (!post.likes) return 0;
        return Object.values(post.likes).filter((liked) => liked).length;
    };

    const filteredPosts = posts
        .filter(post => {
            if (filterBy === "text" && post.image) return false;
            if (filterBy === "image" && !post.image) return false;

            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return (
                    (post.content && post.content.toLowerCase().includes(searchLower)) ||
                    (post.author && post.author.name && post.author.name.toLowerCase().includes(searchLower))
                );
            }

            return true;
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="p-1 rounded-full hover:bg-gray-100">
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">All Posts</h1>
                    </div>

                    <Link
                        to="/create-post"
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                    >
                        Create Post
                    </Link>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <div className="flex flex-col space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Filter by:</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setFilterBy("all")}
                                    className={`px-3 py-1 text-sm rounded-full ${filterBy === "all" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700"}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilterBy("text")}
                                    className={`px-3 py-1 text-sm rounded-full ${filterBy === "text" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700"}`}
                                >
                                    Text
                                </button>
                                <button
                                    onClick={() => setFilterBy("image")}
                                    className={`px-3 py-1 text-sm rounded-full ${filterBy === "image" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700"}`}
                                >
                                    Images
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {posts.length === 0 ? "No posts yet" : "No posts found"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {posts.length === 0
                                ? "Share your first post with your community"
                                : "Try adjusting your search or filter to find what you're looking for"}
                        </p>
                        <Link
                            to="/create-post"
                            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                        >
                            Create your first post
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredPosts.map(post => (
                            <div key={post.id} className="bg-white rounded-lg shadow">
                                {/* Post Header */}
                                <div className="p-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            <User className="h-6 w-6 text-gray-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{post.author?.name || "User"}</h4>
                                            <p className="text-xs text-gray-500">{formatTime(post.timestamp)}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            className="p-1 rounded-full hover:bg-gray-100"
                                            onClick={(e) => toggleMenu(post.id, e)}
                                        >
                                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                                        </button>

                                        {menuOpen === post.id && (
                                            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                                <Link
                                                    to={`/edit-post/${post.id}`}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(post.id);
                                                    }}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {post.content && (
                                    <div className="px-4 pb-2">
                                        <p className="text-gray-800">{post.content}</p>
                                    </div>
                                )}

                                {post.image && (
                                    <div className="px-4 pb-4">
                                        <img
                                            src={post.image}
                                            alt="Post"
                                            className="rounded-lg w-full max-h-96 object-contain"
                                        />
                                    </div>
                                )}

                                <div className="px-4 py-2 border-t border-gray-200 text-sm text-gray-500">
                                    <div className="flex justify-between">
                                        <span>{countLikes(post)} likes</span>
                                        <span>{(post.comments || []).length} comments</span>
                                    </div>
                                </div>

                                <div className="px-4 py-2 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center justify-center flex-1 py-1 rounded-lg hover:bg-gray-100 font-medium ${hasUserLiked(post) ? 'text-pink-600' : 'text-gray-700'}`}
                                        >
                                            <Heart
                                                className={`h-5 w-5 mr-2 ${hasUserLiked(post) ? 'fill-current text-pink-600' : 'text-gray-500'}`}
                                            />
                                            {hasUserLiked(post) ? 'Liked' : 'Like'}
                                        </button>
                                        <button
                                            onClick={() => setActiveCommentInput(activeCommentInput === post.id ? null : post.id)}
                                            className="flex items-center justify-center flex-1 py-1 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                                        >
                                            <MessageCircle className="h-5 w-5 text-gray-500 mr-2" />
                                            Comment
                                        </button>
                                        <button
                                            onClick={() => handleBookmark(post.id)}
                                            className={`flex items-center justify-center flex-1 py-1 rounded-lg hover:bg-gray-100 font-medium ${hasUserBookmarked(post) ? 'text-green-600' : 'text-gray-700'}`}
                                        >
                                            <Bookmark
                                                className={`h-5 w-5 mr-2 ${hasUserBookmarked(post) ? 'fill-current text-green-600' : 'text-gray-500'}`}
                                            />
                                            {hasUserBookmarked(post) ? 'Saved' : 'Save'}
                                        </button>
                                    </div>
                                </div>

                                {activeCommentInput === post.id && (
                                    <div className="px-4 py-2 border-t border-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                placeholder="Write a comment..."
                                                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                            />
                                            <button
                                                onClick={() => handleAddComment(post.id)}
                                                disabled={!commentText.trim()}
                                                className={`p-2 rounded-full ${commentText.trim() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500'}`}
                                            >
                                                <Send className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {post.comments && post.comments.length > 0 && (
                                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                                        <div className="space-y-3">
                                            {post.comments.map((comment) => (
                                                <div key={comment.id} className="flex space-x-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                                                        <User className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="bg-white rounded-lg p-3">
                                                            <div className="flex justify-between items-start">
                                                                <h4 className="font-semibold text-sm">{comment.author}</h4>
                                                                <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Post;