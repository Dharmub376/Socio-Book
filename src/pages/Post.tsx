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
  ArrowLeft,
} from "lucide-react";

const mockUser = {
  id: "user-1",
  name: "Dharmu",
};

type CommentType = {
  id: string;
  text: string;
  author: string;
  userId: string;
  timestamp: string;
};

type PostType = {
  id: string;
  content?: string;
  image?: string;
  author?: {
    name?: string;
    id?: string;
  };
  timestamp: string;
  likes: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  comments: CommentType[];
  likeCount: number;
};

function Post() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [activeCommentInput, setActiveCommentInput] = useState<string | null>(null);
  const [user] = useState(mockUser);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<"all" | "text" | "image">("all");

  useEffect(() => {
    const savedPosts: PostType[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const initializedPosts: PostType[] = savedPosts.map((post) => ({
      ...post,
      likes: post.likes || {},
      bookmarks: post.bookmarks || {},
      comments: post.comments || [],
      likeCount: post.likeCount ?? Object.values(post.likes || {}).filter(Boolean).length,
      timestamp: post.timestamp || new Date().toISOString(),
    }));
    setPosts(initializedPosts);
  }, []);

  const savePosts = (updatedPosts: PostType[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const alreadyLiked = post.likes[user.id] || false;
        return {
          ...post,
          likes: { ...post.likes, [user.id]: !alreadyLiked },
          likeCount: alreadyLiked ? post.likeCount - 1 : post.likeCount + 1,
        };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const handleBookmark = (postId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const alreadyBookmarked = post.bookmarks[user.id] || false;
        return { ...post, bookmarks: { ...post.bookmarks, [user.id]: !alreadyBookmarked } };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment: CommentType = {
          id: Date.now().toString(),
          text: commentText,
          author: user.name,
          userId: user.id,
          timestamp: new Date().toISOString(),
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    savePosts(updatedPosts);
    setCommentText("");
    setActiveCommentInput(null);
  };

  const handleDelete = (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const updatedPosts = posts.filter((post) => post.id !== postId);
    savePosts(updatedPosts);
    setMenuOpen(null);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredPosts = posts
    .filter((post) => {
      if (filterBy === "text" && post.image) return false;
      if (filterBy === "image" && !post.image) return false;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          post.content?.toLowerCase().includes(search) ||
          post.author?.name?.toLowerCase().includes(search)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-1 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold">All Posts</h1>
          </div>
          <Link to="/create-post" className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Create Post
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {filteredPosts.map((post: PostType) => (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === post.id ? null : post.id);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
                {menuOpen === post.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-10">
                    <Link
                      to={`/edit-post/${post.id}`}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
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

            {post.content && <div className="px-4 pb-2">{post.content}</div>}
            {post.image && (
              <div className="px-4 pb-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-lg w-full max-h-96 object-contain"
                />
              </div>
            )}

            <div className="px-4 py-2 border-t border-gray-200 flex justify-between text-sm text-gray-500">
              <span>{post.likeCount} likes</span>
              <span>{post.comments.length} comments</span>
            </div>

            <div className="px-4 py-2 border-t border-gray-200 flex space-x-2">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex-1 py-1 rounded-lg flex justify-center items-center ${
                  post.likes[user.id] ? "text-pink-600" : "text-gray-700"
                }`}
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${post.likes[user.id] ? "fill-current" : ""}`}
                />
                {post.likes[user.id] ? "Liked" : "Like"}
              </button>

              <button
                onClick={() =>
                  setActiveCommentInput(activeCommentInput === post.id ? null : post.id)
                }
                className="flex-1 py-1 rounded-lg flex justify-center items-center text-gray-700"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Comment
              </button>

              <button
                onClick={() => handleBookmark(post.id)}
                className={`flex-1 py-1 rounded-lg flex justify-center items-center ${
                  post.bookmarks[user.id] ? "text-green-600" : "text-gray-700"
                }`}
              >
                <Bookmark className="h-5 w-5 mr-2" />
                {post.bookmarks[user.id] ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
