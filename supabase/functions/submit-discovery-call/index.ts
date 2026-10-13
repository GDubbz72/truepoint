import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown"
    const { topic, size, urgency, name, email, phone, note } = await req.json()

    // Validate required fields
    if (!topic || !size || !urgency || !name || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration")
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Rate limiting: Check if this IP has submitted in the last 60 seconds
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString()
    const { data: recentSubmission, error: queryError } = await supabase
      .from("discovery_calls")
      .select("id")
      .eq("ip_address", ip)
      .gte("created_at", oneMinuteAgo)
      .limit(1)

    if (queryError) {
      console.error("Rate limit check error:", queryError)
    }

    if (recentSubmission && recentSubmission.length > 0) {
      return new Response(
        JSON.stringify({ error: "Please wait a minute before submitting again" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Insert discovery call
    const today = new Date().toISOString().split("T")[0]
    const { error: insertError } = await supabase
      .from("discovery_calls")
      .insert([
        {
          topic,
          size,
          urgency,
          name,
          email,
          phone: phone || null,
          note: note || null,
          date: today,
          slot: "TBD",
          ip_address: ip,
        },
      ])

    if (insertError) {
      console.error("Insert error:", insertError)
      return new Response(
        JSON.stringify({ error: "Failed to submit. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
