const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/sendTemplateMessage', async (req, res) => {
  const { templatename,receivers, ...queryParams } = req.query;
  const whatsappNumber = receivers; // Assuming `receivers` is a single WhatsApp number for simplicity
  
  // Dynamically generate customParams from queryParams
  const customParams = Object.entries(queryParams).map(([name, value]) => ({
    name,
    value
  }));

  const data = {
    template_name: templatename,
    broadcast_name: "string",
    receivers: [
      {
        whatsappNumber,
        customParams
      }
    ]
  };

  try {
    const response = await axios.post('https://live-mt-server.wati.io/306561/api/v2/sendTemplateMessages', data, {
      headers: {
        'accept': '*/*',
        'Authorization': 'Bearer token paste here', // Replace YOUR_TOKEN with your actual token
        'Content-Type': 'application/json-patch+json'
      }
    });
    res.json({ success: true, response: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
