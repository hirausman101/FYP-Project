export async function getRecommendations(payload) {
  try {
    const res = await fetch("http://10.0.2.2:8000/recommend/cli", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error("API fetch error:", e);
    throw e;
  }
}