import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }) {
   const { isPending, mutate: checkout } = useCheckout();

   return (
      <Button
         variation="primary"
         size="small"
         onClick={() => checkout(bookingId)}
         disabled={isPending}>
         Check out
      </Button>
   );
}

export default CheckoutButton;
