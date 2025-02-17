import withAuth from "../../componets/WithAuth";
import axios from "axios";
import "./Feed.css";
import { useEffect, useState } from "react";
import GradientText from "../../componets/ui/GradientText";
import DecryptedText from "../../componets/ui/DecryptedText";




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

    useEffect(() => { getPosts() }, [])

    return (
        <div className="feed-container">

           

            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
            >
                <h1><DecryptedText text="Feed" /></h1>
            </GradientText>
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

export default withAuth(Feed);
