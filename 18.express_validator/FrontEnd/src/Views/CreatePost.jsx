import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if (fileInputRef.current && fileInputRef.current.files.length > 0) {
            formData.append("image", fileInputRef.current.files[0]);
        }
        formData.append("caption", caption);

        axios.post('http://localhost:3000/v1/api/posts/create', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            navigate("/");
        })
        .catch(err => {
            setError(err.response?.data?.message || "An error occurred");
        });
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen max-h-screen bg-zinc-800'>
            <h1 className='text-zinc-100 text-4xl mb-5'> Create a Post </h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-96 p-6 border-4 border-zinc-800 rounded-lg bg-zinc-900'>
                <div className='relative mb-4'>
                    <input
                        ref={fileInputRef}
                        type='file'
                        name='image'
                        accept='image/*'
                        className='p-3 w-full border-4 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-black text-white'
                        onChange={handleImageChange}
                        required
                    />
                    {image && (
                        <button 
                            type='button' 
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700' 
                            onClick={handleRemoveImage}
                        >
                            Remove
                        </button>
                    )}
                </div>
                
                {image && (
                    <div className='mb-4'>
                        <img src={image} alt='Preview' className='w-full h-48 object-cover rounded-md' />
                    </div>
                )}
                
                <textarea
                    placeholder='Caption'
                    name='caption'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='p-3 mb-4 border-4 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-black text-white resize-none'
                    required
                    rows={3}
                />
                
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                
                <button
                    type='submit'
                    className='bg-black border-4 border-zinc-800 text-white font-semibold py-4 px-5 rounded-md hover:bg-blue-500 transition duration-300'
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;