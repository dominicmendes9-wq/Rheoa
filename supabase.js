// supabase.js - Shared Supabase client
const SUPABASE_URL = "https://mtiwodvsrwvrujbhmmrn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_noi80_djvhHDAuQ14hJKQQ_NppeGehp";

// Create and export the Supabase client
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to get the current user
window.getCurrentUser = async function() {
    const { data: { user }, error } = await window.supabaseClient.auth.getUser();
    if (error) {
        console.error('Error getting user:', error);
        return null;
    }
    return user;
};

// Helper to get the current player record
window.getCurrentPlayer = async function() {
    const user = await window.getCurrentUser();
    if (!user) return null;
    const { data: player, error } = await window.supabaseClient
        .from('players')
        .select('*')
        .eq('auth_id', user.id)
        .single();
    if (error) {
        console.error('Error getting player:', error);
        return null;
    }
    return player;
};
