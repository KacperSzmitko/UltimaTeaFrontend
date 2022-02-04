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
import ModalPopUp from "./components/ModalPopUp";
import ShapeGenerator from "./components/WallpaperShape";

function App() {
  
  return (
    <div id="main_window">
      {<ModalPopUp />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="homeBackground">
              <div className="wallpaperElement downWallpaper">
                  <tbody>
                    {[...Array(40)].map((x, i) => <ShapeGenerator zIndex={10+i}/>)}
                </tbody>
              </div>
              <div className="homeWallpaper topWallpaper">
                <div className="homeSignboard topWallpaper">
                  <div className="logo topWallpaper">
                      UltimaTea
                  </div>
                </div>
                <div className="homeContainer topWallpaper">
                  <LoginForm />
                  <RegisterForm />
                </div>
              </div>
            </div>
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
