import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckout() {
   const queryClient = useQueryClient();

   const { mutate: checkout, isPending: isCheckingOut } = useMutation({
      mutationFn: (bookingId) =>
         updateBooking(bookingId, {
            status: 'checked-out',
         }),

      onSuccess: (data, bookingId) => {
         toast.success(`Booking #${data.id} successfully checked out`);
         [
            ['bookings'],
            ['booking', String(bookingId)],
            ['stays'],
            ['stays', 'today'],
         ].forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      },

      onError: () => toast.error('There was an error while checking out'),
   });

   return { checkout, isCheckingOut };
}
