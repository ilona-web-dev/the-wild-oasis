import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useTodayActivity() {
   const { data: activities, isPending } = useQuery({
      queryFn: getStaysTodayActivity,
      queryKey: ['today-activity'],
      onError: (err) => toast.error(err.message),
   });

   return { activities, isPending };
}
