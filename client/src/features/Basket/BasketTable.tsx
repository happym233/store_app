import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const [isRemoveAll, setIsRemoveAll] = useState(false);

  function handleAddItem(productId: number) {
    dispatch(addBasketItemAsync({ productId, quantity: 1 }));
  }

  function handleRemoveItem(productId: number, quantity = 1) {
    if (quantity > 1) setIsRemoveAll(true);
    dispatch(removeBasketItemAsync({ productId, quantity })).finally(() =>
      setIsRemoveAll(false)
    );
  }

  function makeNavLink(isBasket: boolean, productId: number) {
    if (isBasket) {
      return {
        component: NavLink,
        to: `/catalog/${productId}`,
      };
    }
    return "";
  }

  if (!items) return <></>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              {isBasket && <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    {...makeNavLink(isBasket, item.productId)}
                    display="flex"
                    alignItems="center"
                  >
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {isBasket && (
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId &&
                        !isRemoveAll
                      }
                      onClick={() => handleRemoveItem(item.productId, 1)}
                      color="error"
                    >
                      <Remove />
                    </LoadingButton>
                  )}
                  {item.quantity}
                  {isBasket && (
                    <LoadingButton
                      loading={status === "pendingAddingItem" + item.productId}
                      onClick={() => handleAddItem(item.productId)}
                      color="error"
                    >
                      <Add />
                    </LoadingButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {isBasket && (
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId &&
                        isRemoveAll
                      }
                      onClick={() =>
                        handleRemoveItem(item.productId, item.quantity)
                      }
                      color="error"
                    >
                      <Delete />
                    </LoadingButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
