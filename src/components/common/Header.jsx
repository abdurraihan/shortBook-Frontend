import Home from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../hook/useAuth";
import { useProfile } from "../../hook/useProfile";

import { Link } from "react-router-dom";

import Logout from "../auth/Logout";

export default function Header() {
  const { state } = useProfile();
  const { auth } = useAuth();

  const user = state?.user ?? auth?.user;
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="flex items-center space-x-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link>
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={Logo}
            />
          </Link>
        </div>
        <Link to="/" className="btn-primary">
          <img src={Home} alt="Home" />
          Home
        </Link>

        <button className="icon-btn">
          <img src={Notification} alt="Notification" />
        </button>

        <Logout></Logout>

        <Link to="/me" className="flex-center !ml-8 gap-3">
          <span className="text-lg font-medium lg:text-xl">
            {user?.firstName}
          </span>
          <div className="relative max-h-[62px] max-w-[62px] lg:max-h-[84px] lg:max-w-[84px]  ">
            <img
              className="h-full w-full object-cover rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
              alt="user avatar"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
