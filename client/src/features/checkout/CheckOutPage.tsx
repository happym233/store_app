import { Button, Divider, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function CheckoutPage() {
  return (
    <>
      <Typography gutterBottom variant="h3">
        Please login before checkout
      </Typography>
      <Divider />
      <Button fullWidth component={NavLink} to="/catalog">
        Go back to shop
      </Button>
    </>
  );
}
