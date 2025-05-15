import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRouter";
import ListPage from "./pages/ListPage";
import DashboardHome from "./pages/DashboardHome";
// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: "Vazirmatn",
  },
});
function App() {
  // const { i18n } = useTranslation();
  // useEffect(() => {
  //   document.documentElement.lang = i18n.language;
  //   document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  // }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Protected route (dashboard = home) */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="list" element={<ListPage />} />
          </Route>
        </Route>

        {/* Public route (login) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Catch-all: redirect unknown routes to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
