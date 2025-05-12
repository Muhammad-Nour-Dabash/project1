import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
