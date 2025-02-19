import { supabaseClient } from '../supabase/supabase-client'

export async function saveLocation(userId: string, name: string, lat: string, long: string) {
  const parsedLat = parseFloat(lat).toFixed(2)
  const parsedLong = parseFloat(long).toFixed(2)

  const { error } = await supabaseClient.from('saved_locations').insert({
    user_id: userId,
    name,
    lat: parsedLat,
    long: parsedLong,
  })

  if (error) {
    throw error
  }
}

export async function deleteLocation(lat: string, long: string) {
  const parsedLat = parseFloat(lat).toFixed(2)
  const parsedLong = parseFloat(long).toFixed(2)

  const { error } = await supabaseClient
    .from('saved_locations')
    .delete()
    .eq('lat', parsedLat)
    .eq('long', parsedLong)

  if (error) {
    throw error
  }
}

export async function getSavedLocations(): Promise<SavedLocation[]> {
  const { data, error } = await supabaseClient
    .from('saved_locations')
    .select('*')

  if (error) {
    throw error
  }

  return data
}

export async function isLocationSaved(lat: string, long: string) {
  const parsedLat = parseFloat(lat).toFixed(2)
  const parsedLong = parseFloat(long).toFixed(2)

  const { data, error } = await supabaseClient
    .from('saved_locations')
    .select('*')
    .eq('lat', parsedLat)
    .eq('long', parsedLong)

  if (error) {
    throw error
  }

  return data.length > 0
}
