import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import MainAppStatic from "./components/MainAppStatic";
import MakeTea from "./components/MakeTeaView";
import EditRecipes from "./components/EditRecipesView";
import BrowseRecipes from "./components/BrowseRecipesView";
import EditContainers from "./components/EditContainersView";
import EditProfile from "./components/EditProfileView";

function App() {
  return (
    <div id="main_window">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginForm />
              <RegisterForm />
              <Link to="reset_password">Reset password</Link>
            </>
          }
        />
        <Route path="reset_password" element={<ResetPasswordForm />} />
        <Route path="app" element={<MainAppStatic />}>
          <Route path="make_tea" element={<MakeTea />}></Route>
          <Route path="edit_recipes" element={<EditRecipes />}></Route>
          <Route path="public_recipes" element={<BrowseRecipes />}></Route>
          <Route path="edit_containers" element={<EditContainers />}></Route>
          <Route path="edit_profile" element={<EditProfile />}></Route>
        </Route>
        <Route path="*" element={<MainAppStatic redirect={true}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
