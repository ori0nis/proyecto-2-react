import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/search")}>Home page</button>
    </div>
  );
};
