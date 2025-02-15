import axios from "axios";
import "./Feed.css";
import { useEffect, useState } from "react";

const Feed = () => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        axios.get("http://localhost:3000/feed", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            setPosts(res.data.posts)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{getPosts()},[])

    return (
        <div className="feed-container">
            <h2 className="feed-title">Feed</h2>
            <div className="posts">
                {posts?.map((post) => (
                    <div key={post._id} className="post-card">
                        <img src={post.media} alt="Post" className="post-image" />
                        <div className="post-details">
                            <h3 className="author">{post.author.username}</h3>
                            <p className="caption">{post.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
