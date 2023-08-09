import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} label="Full name*" name="fullName" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            label="Address line 1*"
            name="address1"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            label="Address line 2*"
            name="address2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} label="City*" name="city" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            label="State/Province/Region*"
            name="state"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            label="Zip / Postal code*"
            name="zip"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} label="Country*" name="country" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="Save this as default address."
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
}
