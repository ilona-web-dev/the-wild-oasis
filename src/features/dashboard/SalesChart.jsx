import styled from 'styled-components';
import useDarkMode from '../../hooks/useDarkMode';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';
import {
   Area,
   AreaChart,
   CartesianGrid,
   Tooltip,
   XAxis,
   YAxis,
   ResponsiveContainer,
} from 'recharts';
import { eachDayOfInterval, subDays, format } from 'date-fns';
import { isSameDay } from 'date-fns/fp';

const StyledSalesChart = styled(DashboardBox)`
   grid-column: 1 / -1;

   /* Hack to change grid line colors */
   & .recharts-cartesian-grid-horizontal line,
   & .recharts-cartesian-grid-vertical line {
      stroke: var(--color-grey-300);
   }
`;

export function SalesChart({ bookings, numDays }) {
   const { isDarkMode } = useDarkMode();

   const allDates = eachDayOfInterval({
      start: subDays(new Date(), numDays - 1),
      end: new Date(),
   });

   const data = allDates.map((date) => {
      const bookingsForDay = bookings.filter((booking) =>
         isSameDay(date, new Date(booking.created_at))
      );

      const totalSales = bookingsForDay.reduce(
         (acc, cur) => acc + cur.totalPrice,
         0
      );

      const extrasSales = bookingsForDay.reduce(
         (acc, cur) => acc + cur.extrasPrice,
         0
      );

      return {
         label: format(date, 'MMM dd'),
         totalSales,
         extrasSales,
      };
   });

   const colors = isDarkMode
      ? {
           totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
           extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
           text: '#e5e7eb',
           background: '#18212f',
        }
      : {
           totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
           extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
           text: '#374151',
           background: '#fff',
        };
   return (
      <StyledSalesChart>
         <Heading as="h2">
            Sales from {format(allDates.at(0), 'MMM dd yyy')} &mdash;{' '}
            {format(allDates.at(-1), 'MMM dd yyy')}
         </Heading>
         <ResponsiveContainer height={300} width="100%">
            <AreaChart data={data}>
               <XAxis
                  dataKey="label"
                  tick={{ fill: colors.text }}
                  tickLine={{ stroke: colors.text }}
               />
               <YAxis unit="$" />
               <CartesianGrid strokeDasharray="4" />
               <Tooltip contentStyle={{ backgroundColor: colors.background }} />
               <Area
                  dataKey="totalSales"
                  type="monotone"
                  stroke={colors.totalSales.stroke}
                  fill={colors.totalSales.fill}
                  strokeWidth={2}
                  name="Total sales"
                  unit="$"
               />
               <Area
                  dataKey="extrasSales"
                  type="monotone"
                  stroke={colors.extrasSales.stroke}
                  fill={colors.extrasSales.fill}
                  strokeWidth={2}
                  name="Extras sales"
                  unit="$"
               />
            </AreaChart>
         </ResponsiveContainer>
      </StyledSalesChart>
   );
}
