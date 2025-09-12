import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Image,
    Video,
    Smile,
    MapPin,
    X
} from "lucide-react";
import { useAuth } from "./AuthContext";

type Post = {
    id: string;
    content: string;
    image?: string | null;
    timestamp: string;
    authorId: string;
};

function EditPost() {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!id) return;

        const existingPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
        const postToEdit = existingPosts.find((post) => post.id === id);

        if (postToEdit) {
            setContent(postToEdit.content || "");
            setImagePreview(postToEdit.image || null);
        } else {
            alert("Post not found");
            navigate("/home");
        }
    }, [id, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim() && !imagePreview) {
            alert("Please add some text or an image to your post.");
            return;
        }

        if (!user) {
            alert("You must be logged in to edit a post.");
            navigate("/login");
            return;
        }

        setIsSubmitting(true);

        try {
            const existingPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

            const updatedPosts = existingPosts.map((post) => {
                if (post.id === id) {
                    return {
                        ...post,
                        content: content.trim(),
                        image: imagePreview,
                        timestamp: new Date().toISOString(),
                    };
                }
                return post;
            });

            localStorage.setItem("posts", JSON.stringify(updatedPosts));

            setContent("");
            setImage(null);
            setImagePreview(null);
            navigate("/home");
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-lg font-semibold">Edit Post</h1>
                    <div className="w-9"></div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200 flex items-center">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold mr-3">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                        <div>
                            <h2 className="font-semibold">{user.name}</h2>
                        </div>
                    </div>

                    <div className="p-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`What's on your mind, ${user.name?.split(" ")[0] || "there"}?`}
                            className="w-full resize-none border-none focus:outline-none focus:ring-0 text-lg placeholder-gray-500 min-h-[120px]"
                        />

                        {imagePreview && (
                            <div className="mt-4 relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="rounded-lg w-full max-h-96 object-contain"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
                                >
                                    <X className="h-5 w-5 text-white" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mx-4 p-3 border border-gray-300 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Add to your post</h3>
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 rounded-full hover:bg-gray-100 text-green-600"
                            >
                                <Image className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="p-2 rounded-full hover:bg-gray-100 text-blue-500"
                                onClick={() => alert("Video upload coming soon!")}
                            >
                                <Video className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="p-2 rounded-full hover:bg-gray-100 text-yellow-500"
                                onClick={() => alert("Emoji picker coming soon!")}
                            >
                                <Smile className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="p-2 rounded-full hover:bg-gray-100 text-red-500"
                                onClick={() => alert("Location feature coming soon!")}
                            >
                                <MapPin className="h-5 w-5" />
                            </button>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    <div className="p-4">
                        <button
                            onClick={handleSubmit}
                            disabled={(!content.trim() && !imagePreview) || isSubmitting}
                            className={`w-full py-2 px-4 rounded-lg font-semibold ${
                                (!content.trim() && !imagePreview) || isSubmitting
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                        >
                            {isSubmitting ? "Updating..." : "Update Post"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
