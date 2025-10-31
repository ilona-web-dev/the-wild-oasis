import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile as updateUserProfileApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUserProfile() {
   const queryClient = useQueryClient();

   const { mutate: updateUserProfile, isPending } = useMutation({
      mutationFn: updateUserProfileApi,
      onSuccess: () => {
         queryClient.invalidateQueries(['user']);
         toast.success('Your account was successfully updated');
      },
      onError: (error) => {
         toast.error(`Error: ${error.message}`);
      },
   });

   return { updateUserProfile, isPending };
}
