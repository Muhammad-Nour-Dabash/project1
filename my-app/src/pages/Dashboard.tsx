import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  AppBar,
  IconButton,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "../components/Logout";
import MemoryIcon from "@mui/icons-material/Memory";
import { useAuth } from "../context/AuthContext";
import { Home } from "@mui/icons-material";

const drawerWidth = 240;

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const userEmail = user?.email;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation items for the drawer
  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home />,
    },
    {
      label: "Memories",
      path: "/list",
      icon: <MemoryIcon />,
    },
  ];

  // Sidebar drawer content (shown in both mobile & desktop)
  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Spacer to align with AppBar on mobile */}
      {isMobile && <Toolbar />}

      {/* Header: App icon and user email */}
      <Box>
        <Toolbar sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 2 }}>
            <img
              src="/favicon.ico"
              alt="App Logo"
              style={{ width: 56, height: 56, marginRight: 8 }}
            />
            <Typography variant="h6" noWrap>
              Project1
            </Typography>
          </Box>

          {/* User email with ellipsis and tooltip */}
          <Tooltip title={userEmail}>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {userEmail}
            </Typography>
          </Tooltip>
        </Toolbar>

        <Divider />

        {/* Navigation links */}
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname === "/")
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Push logout to the bottom */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ mb: 1 }}>
        <Box textAlign="center">
          <LogoutButton />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: location.pathname === "/" ? "center" : "start",
        alignItems: location.pathname === "/" ? "center" : "start",
      }}
    >
      <CssBaseline />

      {/* AppBar for mobile screens only */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer container */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // better performance on mobile
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main page content */}
      <Outlet />
    </Box>
  );
};

export default Dashboard;
