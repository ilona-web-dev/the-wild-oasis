import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function signup({ fullName, password, email }) {
   const { data, error } = await supabase.auth.signUp({
      password,
      email,
      options: {
         data: {
            fullName,
            avatar: '',
         },
      },
   });
   if (error) throw new Error(error.message);
   return data?.user;
}

export async function login({ email, password }) {
   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) throw new Error(error.message);

   return data?.user;
}

export async function getCurrentUser() {
   const { data: session } = await supabase.auth.getSession();
   if (!session.session) return null;

   const { data, error } = await supabase.auth.getUser();

   if (error) throw new Error(error.message);

   return data?.user;
}

export async function logout() {
   const { error } = await supabase.auth.signOut();
   if (error) throw new Error(error.message);
}

export async function updateUserPassword({ password }) {
   const { data: updatedUser, error } = await supabase.auth.updateUser({
      password,
   });
   if (error) throw new Error(error.message);
   return updatedUser;
}

export async function updateUserProfile({ fullName, avatar }) {
   let avatarUrl;

   if (avatar) {
      const fileName = `avatar-${Date.now()}-${Math.random()}`;

      const { error: storageError } = await supabase.storage
         .from('avatars')
         .upload(fileName, avatar);

      if (storageError) throw new Error(storageError.message);

      avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
   }

   const updateData = {
      data: {
         ...(fullName && { fullName }),
         ...(avatar && { avatar: avatarUrl }),
      },
   };

   const { data, error } = await supabase.auth.updateUser(updateData);

   if (error) throw new Error(error.message);

   return data;
}
