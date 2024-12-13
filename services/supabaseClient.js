import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tgwwlxcctksodebfaryv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnd3dseGNjdGtzb2RlYmZhcnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTA1MjQsImV4cCI6MjA0OTU4NjUyNH0.eBt-AqitBsyHvebGSgn5M7E0SiNvh08QLgyYLup4BQ0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})