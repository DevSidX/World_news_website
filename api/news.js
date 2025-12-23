export default async function handler(req, res) {
  try {
    const query = req.query.q || "latest";
    const API_KEY = process.env.GNEWS_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${API_KEY}`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
