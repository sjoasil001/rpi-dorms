import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://alnrgjldetyjgsqfawdj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsbnJnamxkZXR5amdzcWZhd2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTIyMzMsImV4cCI6MjA1OTk4ODIzM30.rWR9U43YAXDD0wV-hO77aIvHZtb3KS--evcYkFKNXs8'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
