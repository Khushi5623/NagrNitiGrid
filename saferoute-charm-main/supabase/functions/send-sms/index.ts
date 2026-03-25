// Supabase Edge Function (Dummy SMS - Demo Mode)

Deno.serve(async (req: Request) => {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone and message required" }),
        { status: 400 }
      );
    }

    // SMS disabled — demo mode
    return new Response(
      JSON.stringify({
        success: true,
        demo: true,
        message: "SMS feature currently disabled (Demo Mode)"
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong" }),
      { status: 500 }
    );
  }
});
