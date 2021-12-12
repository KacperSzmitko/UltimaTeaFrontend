import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import MainAppStatic from "./components/MainAppStatic";
import MakeTea from "./components/MakeTea";
import EditRecipes from "./components/EditRecipes";

function App() {
  return (
    <div className="container">
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
          <Route path="make_tea" element={<MakeTea/>}></Route>
          <Route path="edit_recipes" element={<EditRecipes/>}></Route>
          <Route path="public_recipes"></Route>
          <Route path="edit_ingredients"></Route>
          <Route path="machine_status"></Route>
          <Route path="edit_profile"></Route>
        </Route>
        <Route path="r" element={<p>Elo</p>} />
      </Routes>
    </div>
  );
}

export default App;
