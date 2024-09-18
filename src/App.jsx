import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";

export default function App() {
  return (
    <Routes>
      <Route element={<HomePage></HomePage>} path="/" exact></Route>
      <Route element={<LoginPage></LoginPage>} path="/login"></Route>
      <Route element={<ProfilePage></ProfilePage>} path="/me"></Route>
      <Route
        element={<RegistrationPage></RegistrationPage>}
        path="/register"
      ></Route>

      <Route element={<NotFoundPage></NotFoundPage>} path="*"></Route>
    </Routes>
  );
}
