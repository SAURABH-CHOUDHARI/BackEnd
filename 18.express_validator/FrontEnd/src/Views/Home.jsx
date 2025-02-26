import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/ui/Navbar";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);

    // Fetch posts from API
    const fetchPosts = async (cursor = null) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/v1/api/posts/feed", {
                params: cursor ? { cursor } : {}, // Correct placement for params
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Always include token
            }
            });

            if (response.data.success) {
                setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
                setNextCursor(response.data.nextCursor); // Save nextCursor for infinite scroll
            }
        } catch (err) {
            setError("Failed to load posts");
        }
        setLoading(false);
    };

    // Fetch posts on component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-800 text-white ">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-6">
                <h2 className="text-xl font-bold mb-4">Recent Posts</h2>

                {/* Show error message */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Show posts */}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="bg-zinc-900 p-4 rounded-lg mb-4">
                            <img src={post.media} alt="Post" className="w-full h-60 object-cover rounded-lg mb-2" />
                            <p className="text-lg font-semibold">{post.caption}</p>
                            <p className="text-sm text-gray-400">Likes: {post.likes.length}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}

                {/* Load More Button (for Infinite Scroll) */}
                {nextCursor && (
                    <button
                        onClick={() => fetchPosts(nextCursor)}
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Home;
