import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import { useSearchParams } from 'react-router-dom';

function BookingTable() {
   const { bookings, isPending } = useBookings();
   const [searchParams] = useSearchParams();

   if (isPending) return <Spinner />;
   if (!bookings?.length) return <Empty resourceName="bookings" />;

   const status = searchParams.get('status') || 'all';

   let filteredBookings = bookings;
   if (status === 'checked-in')
      filteredBookings = bookings.filter(
         (booking) => booking.status === 'checked-in'
      );
   if (status === 'checked-out')
      filteredBookings = bookings.filter(
         (booking) => booking.status === 'checked-out'
      );

   if (status === 'unconfirmed')
      filteredBookings = bookings.filter(
         (booking) => booking.status === 'unconfirmed'
      );

   const sortValue = searchParams.get('sortBy') || 'startDate-desc';
   const [field, direction] = sortValue.split('-');
   const modifier = direction === 'asc' ? 1 : -1;

   const sortedBookings = filteredBookings.slice().sort((a, b) => {
      if (field === 'startDate')
         return (new Date(a.startDate) - new Date(b.startDate)) * modifier;
      if (field === 'totalPrice')
         return (a.totalPrice - b.totalPrice) * modifier;
      return 0;
   });

   return (
      <Menus>
         <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
            <Table.Header>
               <div>Cabin</div>
               <div>Guest</div>
               <div>Dates</div>
               <div>Status</div>
               <div>Amount</div>
               <div></div>
            </Table.Header>

            <Table.Body
               data={sortedBookings}
               render={(booking) => (
                  <BookingRow key={booking.id} booking={booking} />
               )}
            />

            <Table.Footer></Table.Footer>
         </Table>
      </Menus>
   );
}

export default BookingTable;
