import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Heart, MessageCircle, Send, MoreHorizontal, Play } from "lucide-react";

interface ReelType {
    id: string;
    video: string;
    author: {
        name: string;
        id: string;
    };
    likes: number;
    comments: number;
    caption?: string;
    timestamp: string;
}

function Reels() {
    const [reels, setReels] = useState<ReelType[]>([]);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [muted, setMuted] = useState(false); 
    const [playing, setPlaying] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRefs = useRef<HTMLVideoElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchReels = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dharmub376.github.io/jsons/reels.json');

                if (!response.ok) {
                    throw new Error(`Failed to fetch reels: ${response.status}`);
                }

                const data = await response.json();
                setReels(data);
            } catch (error) {
                console.error("Failed to fetch reels:", error);
                setError("Failed to load reels. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReels();
    }, []);

    useEffect(() => {
        if (reels.length === 0) return;

        const playCurrentVideo = async () => {
            if (videoRefs.current[currentReelIndex]) {
                try {
                    await videoRefs.current[currentReelIndex].play();
                    setPlaying(true);
                } catch (error) {
                    console.error("Error playing video:", error);
                    setPlaying(false);
                }
            }
        };

        videoRefs.current.forEach((video, index) => {
            if (video && index !== currentReelIndex) {
                video.pause();
                video.currentTime = 0; 
            }
        });

        playCurrentVideo();
    }, [currentReelIndex, reels.length]);

    useEffect(() => {
        if (reels.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setCurrentReelIndex(index);
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.8, 
            }
        );

        const videoContainers = document.querySelectorAll('.reel-container');
        videoContainers.forEach(container => observer.observe(container));

        return () => {
            videoContainers.forEach(container => observer.unobserve(container));
        };
    }, [reels.length]);


    const toggleMute = () => {
        setMuted(prev => !prev);
    };

    const togglePlay = useCallback(() => {
        if (videoRefs.current[currentReelIndex]) {
            if (videoRefs.current[currentReelIndex].paused) {
                videoRefs.current[currentReelIndex].play()
                    .then(() => setPlaying(true))
                    .catch(error => console.error("Error playing video:", error));
            } else {
                videoRefs.current[currentReelIndex].pause();
                setPlaying(false);
            }
        }
    }, [currentReelIndex]);

    const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.preventDefault();
        togglePlay();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-white text-lg">Loading reels...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-white text-lg text-center">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-white text-lg">No reels available</div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="h-screen w-full bg-black overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        >
            {reels.map((reel, index) => (
                <div
                    key={reel.id}
                    data-index={index}
                    className="reel-container h-screen w-full flex items-center justify-center snap-start snap-always"
                >
                    <div className="relative h-full max-h-[90vh] w-full max-w-md mx-auto aspect-[9/16]">
                        <video
                            ref={el => {
                                if (el) videoRefs.current[index] = el;
                            }}
                            src={reel.video}
                            className="h-full w-full object-cover rounded-none md:rounded-xl"
                            loop
                            muted={muted}
                            onClick={handleVideoClick}
                            playsInline
                            preload="auto"
                        />

                        {!playing && index === currentReelIndex && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
                                onClick={togglePlay}
                            >
                                <Play className="h-16 w-16 text-white opacity-80" />
                            </div>
                        )}

                        {/* Reel info and controls */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                            {/* Top controls */}
                            <div className="flex justify-between items-start z-10">
                                <h1 className="text-xl font-bold">Reels</h1>
                                <button
                                    onClick={toggleMute}
                                    className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
                                >
                                    {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                                </button>
                            </div>

                            <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6 z-10">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all mb-1"
                                    >
                                        <Heart className="h-6 w-6" />
                                    </button>
                                    <span className="text-sm">{reel.likes}</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all mb-1">
                                        <MessageCircle className="h-6 w-6" />
                                    </button>
                                    <span className="text-sm">{reel.comments}</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all mb-1">
                                        <Send className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all">
                                        <MoreHorizontal className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="max-w-[70%] z-10">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {reel.author.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="font-semibold">{reel.author.name}</span>
                                </div>

                                {reel.caption && (
                                    <p className="text-sm mb-2 line-clamp-3">{reel.caption}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Reels;