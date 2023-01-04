import { useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export default function Home(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  useEffect(function () {
    navigate("/posts");
  }, []);

  return <div>do not need to develope</div>;
}
