const axios = require("axios");
require("dotenv").config();

async function getToken() {
  const client_id = process.env.SPOTIFY_ID;
  const client_secret = process.env.SPOTIFY_SECRET;
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}

async function getTrackInfo(access_token) {
  const almbumId = process.env.TRACK_ALBUMS;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${almbumId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    console.log(response.data.tracks.items);
    if (!response.data || !response.data.tracks.items) {
      console.error("Error fetching playlists: No items found in response.");
      return [];
    }
    const tracks = response.data.tracks.items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      image: item.track.album.images[0].url,
    }));

    return tracks;
    // return response.data;
  } catch (error) {
    console.error("Error fetching track info:", error);
    throw error;
  }
}

module.exports = {
  getToken,
  getTrackInfo,
};
