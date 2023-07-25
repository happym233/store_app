import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "Product" + (prevState.length + 1),
        description: "Some description",
        price: (prevState.length + 1) * 100,
        pictureUrl: "Some url",
        type: "Some type",
        brand: "Some brand",
        quantityInStock: 100,
      },
    ]);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
      <Button variant="contained" onClick={addProduct} sx={{ marginTop: 2 }}>
        add product
      </Button>
    </>
  );
}
