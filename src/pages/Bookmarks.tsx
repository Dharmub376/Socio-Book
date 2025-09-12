import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark, User } from "lucide-react";

type Post = {
    id: string | number;
    author?: {
        name?: string;
    };
    timestamp?: string | number | Date;
    content?: string;
    image?: string;
    likeCount?: number;
    comments?: { id: string | number; text: string; author?: { name?: string } }[];
};

function Bookmarks() {
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);

    const user = {
        id: "user-1",
        name: "Dharmu"
    };

    useEffect(() => {
        if (!user) return;

        const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");

        const userBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${user.id}`) || "{}");

        const bookmarked = allPosts.filter(
            (post: { id: string | number }) => userBookmarks[post.id]
        );

        setBookmarkedPosts(bookmarked);
    }, []);

    const formatTime = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(
                (now.getTime() - date.getTime()) / (1000 * 60)
            );
            return `${diffInMinutes}m ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-4">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <Link
                        to="/home"
                        className="mr-4 p-2 rounded-full hover:bg-gray-200"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Saved Posts</h1>
                </div>

                {bookmarkedPosts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No saved posts yet
                        </h3>
                        <p className="text-gray-500">
                            Posts you save will appear here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookmarkedPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg shadow p-4"
                            >
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <User className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {post.author?.name || "User"}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {formatTime(
                                                post.timestamp ?? Date.now()
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {post.content && (
                                    <div className="mb-3">
                                        <p className="text-gray-800">
                                            {post.content}
                                        </p>
                                    </div>
                                )}

                                {post.image && (
                                    <div className="mb-3">
                                        <img
                                            src={post.image}
                                            alt="Post"
                                            className="rounded-lg w-full max-h-96 object-contain"
                                        />
                                    </div>
                                )}

                                <div className="flex justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                                    <span>{post.likeCount || 0} likes</span>
                                    <span>
                                        {(post.comments || []).length} comments
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bookmarks;
