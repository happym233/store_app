import {
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Oops - page not found
      </Typography>
      <Divider />
      <Button fullWidth component={Link} href="/catalog">
        Go back to shop
      </Button>
    </Container>
  );
}
