import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Order } from "../../app/models/order";
import { Height } from "@mui/icons-material";
import { dollarFormat } from "../../app/util/util";
import BasketTable from "../Basket/BasketTable";
import { BasketItem } from "../../app/models/basket";

interface Props {
  order: Order;
  setSelectedOrderNumber: Function;
}

export default function OrderDetail({ order, setSelectedOrderNumber }: Props) {
  return (
    <>
      <Container component={Paper} sx={{ padding: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Grid item xs={6} sm={6}>
            <Typography variant="h6" color="primary" gutterBottom>
              Order Number #{order.id} - {order.orderStatus}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Button
              variant="outlined"
              onClick={() => setSelectedOrderNumber(-1)}
            >
              Back to Orders
            </Button>
          </Grid>
        </Box>
        <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
          <List disablePadding>
            <ListItem>
              <BasketTable
                items={order.orderItems as BasketItem[]}
                isBasket={false}
              />
            </ListItem>

            <ListItem sx={{ px: 3 }}>
              <ListItemText primary="Subtotal" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {dollarFormat(order.subtotal)}
              </Typography>
            </ListItem>
            <ListItem sx={{ px: 3 }}>
              <ListItemText primary="Delivery fee" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {dollarFormat(order.deliveryFee)}
              </Typography>
            </ListItem>
            <ListItem sx={{ px: 3 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {dollarFormat(order.subtotal + order.deliveryFee)}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ px: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{order.shippingAddress.fullName}</Typography>
          <Typography gutterBottom>
            {order.shippingAddress.address1 +
              ", " +
              order.shippingAddress.address2}
          </Typography>
          <Typography gutterBottom>
            {order.shippingAddress.city +
              ", " +
              order.shippingAddress.state +
              ", " +
              order.shippingAddress.country}
          </Typography>
          <Typography gutterBottom>{order.shippingAddress.zip}</Typography>
        </Grid>
      </Container>
    </>
  );
}
