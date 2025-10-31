import { useUser } from './useUser';
import { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateUserProfile } from './useUpdateUserProfile';
import SpinnerMini from '../../ui/SpinnerMini';

function UpdateUserDataForm() {
   const { user, isPending } = useUser();
   const { updateUserProfile, isPending: isUpdating } = useUpdateUserProfile();

   const [fullName, setFullName] = useState('');
   const [avatar, setAvatar] = useState(null);

   useEffect(() => {
      if (user?.user_metadata?.fullName) {
         setFullName(user.user_metadata.fullName);
      }
   }, [user?.user_metadata?.fullName]);

   if (isPending) return <SpinnerMini />;
   if (!user) return null;

   const { email } = user;

   function handleSubmit(e) {
      e.preventDefault();
      if (!fullName) return;

      updateUserProfile(
         { fullName, avatar },
         {
            onSuccess: () => {
               setAvatar(null);
               // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
               e.target.reset();
            },
         }
      );
   }

   function handleCancel() {
      setFullName(user.user_metadata?.fullName ?? '');
      setAvatar(null);
   }

   return (
      <Form onSubmit={handleSubmit}>
         <FormRow label="Email address">
            <Input value={email} disabled />
         </FormRow>
         <FormRow label="Full name">
            <Input
               type="text"
               value={fullName}
               onChange={(e) => setFullName(e.target.value)}
               disabled={isUpdating}
               id="fullName"
            />
         </FormRow>
         <FormRow label="Avatar image">
            <FileInput
               disabled={isUpdating}
               id="avatar"
               accept="image/*"
               onChange={(e) => setAvatar(e.target.files[0])}
               // We should also validate that it's actually an image, but never mind
            />
         </FormRow>
         <FormRow>
            <Button onClick={handleCancel} type="reset" variation="secondary">
               Cancel
            </Button>
            <Button disabled={isUpdating}>Update account</Button>
         </FormRow>
      </Form>
   );
}

export default UpdateUserDataForm;
