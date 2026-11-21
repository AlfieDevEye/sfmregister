export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return response.status(503).json({
      ok: false,
      error: "The registration service is not configured. Please contact the SFM team.",
    });
  }

  let payload = request.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return response.status(400).json({ ok: false, error: "Invalid registration data." });
    }
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return response.status(400).json({ ok: false, error: "Invalid registration data." });
  }

  try {
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const text = await upstream.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("The registration service returned an unreadable response.");
    }

    if (!upstream.ok || !result.ok) {
      return response.status(502).json({
        ok: false,
        error: result.error || "The registration could not be saved. Please try again.",
      });
    }
    return response.status(200).json(result);
  } catch (error) {
    console.error("Apps Script registration failed:", error);
    return response.status(502).json({
      ok: false,
      error: error.message || "The registration service could not be reached. Please try again.",
    });
  }
}
