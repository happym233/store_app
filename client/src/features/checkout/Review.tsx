import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "../Basket/BasketTable";
import { dollarFormat } from "../../app/util/util";
import { ShippingAddress } from "../../app/models/order";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

interface Props {
  address: ShippingAddress;
}

export default function Review({ address }: Props) {
  const { basket } = useAppSelector((state) => state.basket);

  const subtotal = basket
    ? basket.items.reduce((sum, y) => sum + y.price * y.quantity, 0)
    : 0;
  const deliveryFee = subtotal > 10000 ? 0 : subtotal * 0.15;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem>
          <BasketTable items={basket?.items!} isBasket={false} />
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {dollarFormat(subtotal)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Delivery fee" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {dollarFormat(deliveryFee)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {dollarFormat(subtotal + deliveryFee)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.fullName}</Typography>
          <Typography gutterBottom>
            {address.address1 + ", " + address.address2}
          </Typography>
          <Typography gutterBottom>
            {address.city + ", " + address.state + ", " + address.country}
          </Typography>
          <Typography gutterBottom>{address.zip}</Typography>
        </Grid>
        {/*<Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
            </Grid>*/}
      </Grid>
    </>
  );
}
