import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Order } from "../../app/models/order";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { dollarFormat, timeFormat } from "../../app/util/util";
import OrderDetail from "./OrderDetail";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState<number>(-1);

  useEffect(() => {
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders..." />;

  if (orders && selectedOrderNumber >= 0)
    return (
      <OrderDetail
        order={orders.find((order) => order.id === selectedOrderNumber)!}
        setSelectedOrderNumber={setSelectedOrderNumber}
      />
    );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" color="primary">
            Orders
          </Typography>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{timeFormat(order.orderDate)}</TableCell>
                  <TableCell>{order.shippingAddress.fullName}</TableCell>
                  <TableCell>
                    {order.shippingAddress.city +
                      ", " +
                      order.shippingAddress.country}
                  </TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell align="right">
                    {dollarFormat(order.total)}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => setSelectedOrderNumber(order.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
