import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  setDarkMode: Function;
}

export default function Header({ darkMode, setDarkMode }: Props) {
  function changeMode() {
    setDarkMode(!darkMode);
  }

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6">Store</Typography>
        <Switch onChange={changeMode}></Switch>
      </Toolbar>
    </AppBar>
  );
}
