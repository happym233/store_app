import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { ExpandMore } from "@mui/icons-material";
import { red } from "@mui/material/colors";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
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
          <Button size="small">Add to cart</Button>
          <Button component={Link} href={`/catalog/${item.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
