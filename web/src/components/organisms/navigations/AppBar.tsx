import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import theme from "../../../theme/hooks/CreateTheme";
import { useNavigate } from "react-router-dom";
import BrowserLocalStorage from "../../../utils/localStorage/BrowserLocalStorage";
import { UserRoles } from "../../../types/enums/UserRoles";

const settings = ["Logout"];

function NavigationAppBar() {
  const [selectedPage, setSelectedPage] = React.useState<null | string>();
  const [userRole, setUserRole] = React.useState(UserRoles.Unspecified);

  React.useEffect(() => {
    setUserRole(BrowserLocalStorage.GetUserRole());
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const getPages = () => {
    if (userRole == UserRoles.BackOfficer) {
      return [
        "Travelers Details",
        "Train Details",
        "Reservation Management",
        "Reservation Details",
      ];
    }

    if (userRole == UserRoles.TravelAgent) {
      return [
        "Travelers Details",
        "Reservation Management",
        "Reservation Details",
      ];
    }

    return [];
  };

  const handleSelectPage = (page: string) => {
    setSelectedPage(page); // Update the selected page when changed

    if (userRole === UserRoles.BackOfficer) {
      const pageIndex = getPages().indexOf(page);
      if (pageIndex === 0) {
        navigate("/travelersDetails");
      } else if (pageIndex === 1) {
        navigate("/trainDetails");
      } else if (pageIndex === 2) {
        navigate("/reservationManagement");
      } else if (pageIndex === 3) {
        navigate("/reservationDetails");
      } else {
        navigate("/*");
      }
    } else if (userRole === UserRoles.TravelAgent) {
      const pageIndex = getPages().indexOf(page);
      if (pageIndex === 0) {
        navigate("/travelersDetails");
      } else if (pageIndex === 1) {
        navigate("/reservationManagement");
      } else if (pageIndex === 2) {
        navigate("/reservationDetails");
      } else {
        navigate("/*");
      }
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    BrowserLocalStorage.RemoveAccessToken();
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            alt="Cindy Baker"
            src="/images/k.jpg"
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {getPages().map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    textTransform={"capitalize"}
                    onClick={() => handleSelectPage(page)}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {getPages().map((page) => (
              <Button
                key={page}
                onClick={() => handleSelectPage(page)}
                sx={{
                  my: 2,
                  color: theme.palette.white.main,
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/images/menu (2).png"
                  variant="rounded"
                  sx={{ width: 28, height: 28 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogOut}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationAppBar;
