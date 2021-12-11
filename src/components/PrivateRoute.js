import { useSelector } from "react-redux";
import { check_token } from "../actions/authActions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const storeToken = useSelector((state) => state.auth.token);
  const [isValid, setIsValid] = useState(false);
  const [wait, setWait] = useState(true);

  useEffect(() => {
    check_token(storeToken).then((response) => {
      if (response.status === 200) {
        setIsValid(true);
      } else setWait(false);
    });
  }, [storeToken]);

  if (isValid) return children;
  if (!isValid && wait) return null;
  if (!isValid && !wait)
    return (
      <>
        {" "}
        Wygląda na to że nie jesteś zalogowany{" "}
        <Link to="/">Powrót dostrony logowania</Link>{" "}
      </>
    );
}
