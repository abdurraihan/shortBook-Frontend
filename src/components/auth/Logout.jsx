import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hook/useAuth.js";

export default function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <button className="icon-btn" onClick={handleLogout}>
      <img src={LogoutIcon} alt="LogoutIcon" />
    </button>
  );
}
