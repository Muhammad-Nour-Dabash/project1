import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      {t("logout")}
    </Button>
  );
};

export default LogoutButton;
