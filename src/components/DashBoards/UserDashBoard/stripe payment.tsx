// StripePayment.tsx
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';

interface StripePaymentProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({ open, onClose, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    
    // Fetch the client secret from your backend
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), 
    });
    const { clientSecret } = await response.json();
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });
    
    setLoading(false);
    if (error) {
      onError(error.message || 'An unexpected error occurred');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      onError('Payment did not succeed.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <CardElement options={{ hidePostalCode: true }} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe || loading}
            style={{ marginTop: '20px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Pay'}
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StripePayment;
