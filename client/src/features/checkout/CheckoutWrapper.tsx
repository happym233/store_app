import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckOutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../Basket/BasketSlice";

const stripePromise = loadStripe(
  "pk_test_51Nbd8YJqRbJu1fpwF7mAmIkrK6c3LMAly2L3NLJqBVxTM2M6N70kiQwERK5QEngj2u0wQApDBPlen0OnZAr4OhRO00FgT4LS1u"
);

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise} options={{ locale: "en" }}>
      <CheckoutPage />
    </Elements>
  );
}
