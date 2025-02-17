import withAuth from "../../componets/WithAuth"
import axios from "axios"
import { useEffect, useState } from "react"
import "./Profile.css"

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/users/profile", {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error)
            })
    }, [])

    if (!user) return <div className="profile-container">Loading...</div>

    return (
        <div className="profile-container">

            <div className="profile-header">
                <img src={user.profileImage} alt="Profile" className="profile-image" />
                <h2 className="username">{user.username}</h2>
            </div>


            <div className="posts-section">
                <h3 className="posts-title">Posts</h3>
                <div className="posts-grid">
                    {user.posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <img src={post.media} alt="Post" />
                            <p className="caption">{post.caption}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default withAuth(Profile);
