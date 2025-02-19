import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_BASE_URL } from '../constants/constants'

export const supabaseClient = createClient(SUPABASE_BASE_URL, SUPABASE_ANON_KEY)
