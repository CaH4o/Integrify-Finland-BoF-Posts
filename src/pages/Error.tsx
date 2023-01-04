import { useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export default function Error(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  function handleNavigate() {
    navigate("/posts");
  }

  useEffect(function () {
    const timer = setTimeout(handleNavigate, 3000);

    return function () {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ margin: "2rem", fontSize: "2rem" }}>
      The page is not found
    </div>
  );
}
