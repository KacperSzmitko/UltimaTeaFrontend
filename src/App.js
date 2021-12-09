import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

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
        <Route path="reset_password" element={<ResetPasswordForm/>} />
        <Route path="app" element={<p> Main app </p>} />
      </Routes>
    </div>
  );
}

export default App;
