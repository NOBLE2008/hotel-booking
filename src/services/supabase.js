import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mwzjkfdoaaxlzohqlqzl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13emprZmRvYWF4bHpvaHFscXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NjA4MzEsImV4cCI6MjAzOTMzNjgzMX0.fuLnY2XTTQPmj0OmNcrm9b1tY1Av-aM-g96LHxmiQJc";
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;