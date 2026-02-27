import { supabaseAdmin } from '@/lib/supabase';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET() {
  try {
    const { data: skills, error } = await supabaseAdmin
      .from('skills')
      .select('*')
      .eq('published', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Failed to fetch skills:', error);
      return corsErrorResponse('Failed to fetch skills', 500);
    }

    return corsResponse({
      skills: skills || [],
      total: skills?.length || 0,
    });
  } catch (error) {
    console.error('Skills manifest error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
