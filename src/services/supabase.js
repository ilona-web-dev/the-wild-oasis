import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://rplmygzdurqwnskpugxv.supabase.co';
const supabaseKey =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbG15Z3pkdXJxd25za3B1Z3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzIyOTUsImV4cCI6MjA3MjY0ODI5NX0.w6SA0ECv0t_xItizR3N8IpZ-qQcLJvAx3f_c_deAYQ0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
