import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRequest } from "../../hooks/use-request";
import { useRouter } from "next/router";

const Order = ({ order, currentUser }) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => {
      router.push("/orders");
    },
  });
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      if (msLeft < 0) {
        clearInterval(interval);
      }
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const interval = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [setTimeLeft]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      <h1>Order</h1>
      <p>{timeLeft} seconds until order expires</p>
      {errors}
      <StripeCheckout
        stripeKey="pk_test_FKhlUSnVar815795jqmPLs35007s9FrQYd"
        amount={order.ticket.price * 100}
        email={currentUser.email}
        token={(token) => {
          doRequest({ token: token.id });
        }}
      />
    </div>
  );
};

Order.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default Order;
