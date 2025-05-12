/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Do NOT log them in. Just show confirmation message
      alert("Check your email to confirm your account before logging in.");
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
        setError(
          "Email not confirmed. Please check your inbox or resend confirmation."
        );
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
          {isSignup ? "Sign Up" : "Log In"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, mb: 1 }}
          >
            {isSignup ? "Create Account" : "Login"}
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
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
              Resend Confirmation Email
            </Button>
          )}
        </form>
      </Box>
    </>
  );
};

export default LoginPage;
