import { useSelector } from "react-redux";
import { check_token } from "../actions/authActions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children, redirect }) {
  const storeToken = useSelector((state) => state.auth.token);
  const [isValid, setIsValid] = useState(false);
  const [wait, setWait] = useState(true);
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    check_token(storeToken).then((response) => {
      if (response.status === 200) {
        if (redirect) navigate("app/make_tea");
        setIsValid(true);
      } else setWait(false);
    });
  }, [storeToken, dispach, navigate]);
  if (isValid) return children;
  if (!isValid && wait) return null;
  if (!isValid && !wait)
    return (
      <>
        {" "}
        Wygląda na to że nie jesteś zalogowany{" "}
        <Link to="/">Powrót do strony logowania</Link>{" "}
      </>
    );
}
