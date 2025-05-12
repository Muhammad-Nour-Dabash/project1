import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRouter";
import ListPage from "./pages/ListPage";
import DashboardHome from "./pages/DashboardHome";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
