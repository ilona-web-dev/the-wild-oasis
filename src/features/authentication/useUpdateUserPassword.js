import { useMutation } from '@tanstack/react-query';
import { updateUserPassword as updateUserPasswordApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUserPassword() {
   const { mutate: updateUserPassword, isPending } = useMutation({
      mutationFn: updateUserPasswordApi,
      onSuccess: () => toast.success('Password updated'),
      onError: (err) => toast.error(err.message),
   });

   return { updateUserPassword, isPending };
}
