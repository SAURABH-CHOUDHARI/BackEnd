import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                try {
                    await axios.get("http://localhost:3000/feed", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Authentication failed:", error);
                    localStorage.removeItem("token");
                    navigate("/login");
                } finally {
                    setLoading(false);
                }
            };

            checkAuth();
        }, [navigate]);

        if (loading) return <div>Loading...</div>;
        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    // **Set a display name for better debugging & hot reload support**
    AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return AuthComponent;
};

export default withAuth;
