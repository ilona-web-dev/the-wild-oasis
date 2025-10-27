import { signup as signupApi } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useSignup() {
   const { mutate: signup, isPending: isCreating } = useMutation({
      mutationFn: signupApi,
      onSuccess: () => {
         toast.success(
            "Account successfully created! Please verufy the new account from the user's email address."
         );
      },
      onError: (err) => toast.error(err.message),
   });

   return { signup, isCreating };
}
