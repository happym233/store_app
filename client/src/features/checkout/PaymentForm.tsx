import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { useFormContext } from "react-hook-form";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { StripeInput } from "./StripeInput";
import { StripeElementType } from "@stripe/stripe-js";
import { useState } from "react";

interface Props {
  cardState: {
    elementError: { [key in StripeElementType]?: string };
  };
  onCardInputChange: (event: any) => void;
}

export default function PaymentForm({ cardState, onCardInputChange }: Props) {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            control={control}
            label="Name On Card*"
            name="nameOnCard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
