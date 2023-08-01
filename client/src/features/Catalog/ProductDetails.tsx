import {
  Button,
  Divider,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { error } from "console";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../Basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const [quantity, setQuantity] = useState(0);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const item = basket?.items.find((i) => i.productId === product?.id);

  function handleInputChange(event: any) {
    if (event.target.value < 0) return;
    setQuantity(event.target.value);
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const udpatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: udpatedQuantity,
        })
      );
    } else if (quantity < item.quantity) {
      const udpatedQuantity = item ? item.quantity - quantity : quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: udpatedQuantity,
        })
      );
    }
  }

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    console.log(product);
    if (!product) id && dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading product..." />;

  if (!product)
    return (
      <>
        <h3> Product not found</h3>
        <Divider />
        <Button fullWidth component={NavLink} to="/catalog">
          Go back to shop
        </Button>
      </>
    );

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              onChange={handleInputChange}
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              disabled={
                quantity === item?.quantity || (!item && quantity === 0)
              }
              loading={
                status.includes("pendingAddItem" + product.id) ||
                status.includes("pendingRemoveItem" + product.id)
              }
              onClick={handleUpdateCart}
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
