import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { TextField, Button, Typography, Box, Snackbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { t } = useTranslation();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSnackbarMessage(t("confirm-email-hint"));
      setShowSnackbar(true);
      return;
    }

    // Login logic
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      // If email not confirmed, show resend option
      if (loginError.message.toLowerCase().includes("email not confirmed")) {
        setError("email-not-confirmed-message");
      } else {
        setError(loginError.message);
      }
      return;
    }

    if (data.user || data.session) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          {isSignup ? t("sign-up") : t("log-in")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t("email")}
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label={t("password")}
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {t(error)}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, mb: 1 }}
          >
            {isSignup ? t("create-account") : t("log-in")}
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? t("already-have-an-account?-log-in")
              : t("don't-have-an-account?-sign-up")}
          </Button>
          {error?.includes("not confirmed") && (
            <Button
              variant="text"
              onClick={async () => {
                const { error } = await supabase.auth.resend({
                  type: "signup",
                  email,
                });

                if (error) {
                  alert("Error resending confirmation: " + error.message);
                } else {
                  alert("Confirmation email resent!");
                }
              }}
              sx={{ mt: 1 }}
            >
              {t("resend-confirmation-email")}
            </Button>
          )}
        </form>
        {/* Snackbar */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </>
  );
};

export default LoginPage;
