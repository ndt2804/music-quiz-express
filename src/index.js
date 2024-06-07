const express = require("express");
const { getToken, getTrackInfo } = require("./services/sportify.services");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use(cors());
app.get("/api/playlists", async (req, res) => {
  try {
    const { access_token } = await getToken();
    const trackInfo = await getTrackInfo(access_token);
    res.json({ data: trackInfo });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port  ${port} : http://localhost:${port}`);
});
