import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../Basket/BasketSlice";
import { NavLink } from "react-router-dom";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {item.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={item.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          image={item.pictureUrl}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
            ${(item.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.brand} / {item.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={status === "pendingAddingItem" + item.id}
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: item.id, quantity: 1 }))
            }
            size="small"
          >
            Add to cart
          </LoadingButton>
          <Button component={NavLink} to={`/catalog/${item.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
