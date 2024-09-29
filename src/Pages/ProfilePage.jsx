import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import useAxios from "../hook/useAxios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        setUser(response?.data.user);
        setPosts(response?.data.posts);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  console.log(`user ${user}`);

  if (loading) {
    return <div>loading ....</div>;
  }

  return <div>{user?.firstName}</div>;
}
