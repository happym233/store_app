import { Button, Divider, Link, Typography } from "@mui/material";

export default function CheckoutPage() {
  return (
    <>
      <Typography gutterBottom variant="h3">
        Please login before checkout
      </Typography>
      <Divider />
      <Button fullWidth component={Link} href="/catalog">
        Go back to shop
      </Button>
    </>
  );
}
