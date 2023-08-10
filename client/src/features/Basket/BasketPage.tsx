import {
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import BasketSummary from "./BasketSummary";
import { useAppSelector } from "../../app/store/configureStore";
import { NavLink } from "react-router-dom";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket)
    return (
      <Container component={Paper} sx={{ height: 400 }}>
        <Typography gutterBottom variant="h3">
          Your basket is empty.
        </Typography>
        <Divider />
        <Button fullWidth component={Link} href="/catalog">
          Go back to shop
        </Button>
      </Container>
    );

  return (
    <>
      <BasketTable items={basket.items} isBasket={true} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={NavLink}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
