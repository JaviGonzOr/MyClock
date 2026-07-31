import { supabase } from "@/lib/supabase/client";

export abstract class BaseRepository {
  protected db = supabase;
}