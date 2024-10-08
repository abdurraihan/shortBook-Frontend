import Home from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Abater from "../../assets/images/avatars/avatar_1.png";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../hook/useAuth";

import { Link } from "react-router-dom";

import Logout from "../auth/Logout";

export default function Header() {
  const { auth } = useAuth();
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
            {auth?.user?.firstName}
          </span>
          <img
            className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
            src={Abater}
            alt=""
          />
        </Link>
      </div>
    </nav>
  );
}
