import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={2}>
      {products.map((item) => (
        <Grid item xs={3} key={item.id}>
          <ProductCard item={item}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
}
