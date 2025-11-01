import {
   HiOutlineBriefcase,
   HiOutlineCalendarDays,
   HiOutlineBanknotes,
   HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
   // 1.
   const numBookings = bookings.length;
   // 2.
   const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
   // 3.
   const checkins = confirmedStays.length;
   // 4.
   const occupation =
      confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount);
   // num checked in nights / all available nights (num days * num cabins)

   return (
      <>
         <Stat
            title="Bookings"
            color="blue"
            icon={<HiOutlineBriefcase />}
            value={numBookings}
         />
         <Stat
            title="Sales"
            color="green"
            icon={<HiOutlineBanknotes />}
            value={formatCurrency(sales)}
         />
         <Stat
            title="Check ins"
            color="indigo"
            icon={<HiOutlineCalendarDays />}
            value={checkins}
         />
         <Stat
            title="Occupancy Rate"
            color="yellow"
            icon={<HiOutlineChartBar />}
            value={(occupation * 100).toFixed(2) + '%'}
         />
      </>
   );
}

export default Stats;
