import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { SalesChart } from './SalesChart';
import { DurationChart } from './DurationChart';
import { TodayActivity } from '../check-in-out/TodayActivity';
import Empty from '../../ui/Empty';

const StyledDashboardLayout = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: auto 34rem auto;
   gap: 2.4rem;
`;

function DashboardLayout() {
   const {
      bookings,
      isPending: isPending1,
      error: bookingError,
   } = useRecentBookings();

   const {
      isPending: isPending2,
      confirmedStays,
      numDays,
      error: staysError,
   } = useRecentStays();

   const { cabins, isPending: isPending3 } = useCabins();

   if (bookingError || staysError)
      return <Empty resourceName="dashboard data" />;

   if (isPending1 || isPending2 || isPending3) return <Spinner />;

   return (
      <StyledDashboardLayout>
         <Stats
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinCount={cabins.length}
         />
         <TodayActivity />
         <DurationChart confirmedStays={confirmedStays} />
         <SalesChart bookings={bookings} numDays={numDays} />
      </StyledDashboardLayout>
   );
}

export default DashboardLayout;
