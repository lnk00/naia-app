import com.lnk0.naia.BuildKonfig
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest

val supabase = createSupabaseClient(
    supabaseUrl = BuildKonfig.SUPABASE_URL,
    supabaseKey = BuildKonfig.SUPABASE_SECRET
) {
    install(Postgrest) {}
}