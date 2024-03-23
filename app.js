const express = require('express');
const axios = require('axios');
const qs = require('qs'); // qs is a querystring parsing library
const app = express();
const port = 3010;

app.use(express.json());
// Middleware to log all POST requests
// app.use((req, res, next) => {
//     console.log(req.method);
//     console.log(req.query);
//   if (req.method === 'GET') {
//     console.log(`Received POST request to ${req.query}`);
//     console.log('Body:', req.query);
//   }
    
//   next(); // Proceed to the next middleware or route handler
// });
// app.use((req, res, next) => {
//     console.log(req.method);

//     // Correctly handle logging objects by using JSON.stringify
//     if (req.method === 'GET') {
//         console.log(`Received GET request to ${req.path}`);
//         console.log('Query:', JSON.stringify(req.query)); // Use JSON.stringify to safely log the object
//     } else if (req.method === 'POST') {
//         console.log(`Received POST request to ${req.path}`);
//         // Assuming you want to log the body for POST requests
//         console.log('Body:', JSON.stringify(req.body)); // Similarly, use JSON.stringify for the body
//     }
    
//     next(); // Proceed to the next middleware or route handler
// });



// app.post('/sendTemplateMessage', async (req, res) => {
//   const { data } = req.body;
//   const templatename = data.elementName;
//   const receivers = data.Contact_phone_number; // Assuming single receiver for simplicity
  
//   // Parse the Message_Parameters string into an object
//   const parsedParams = qs.parse(data.Message_Parameters);

//   // Construct the customParams array from customParamsData
//   const customParams = Object.keys(parsedParams).map(key => ({
//     name: key,
//     value: parsedParams[key]
//   }));
// console.log(customParams);
//   const requestData = {
//     template_name: templatename,
//     broadcast_name: "string", // This can be dynamically set based on your needs
//     receivers: receivers.map(whatsappNumber => ({
//       receivers, // Corrected use of whatsappNumber
//       customParams
//     }))
//   };

//   try {
//     const response = await axios.post('https://live-mt-server.wati.io/Your Tanent ID/api/v2/sendTemplateMessages', requestData, {
//       headers: {
//         'accept': '*/*',
//         'Authorization': 'Bearer YOUR_ACTUAL_TOKEN',
//         'Content-Type': 'application/json-patch+json'
//       }
//     });
//     res.json({ success: true, response: response.data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


app.post('/sendTemplateMessage', async (req, res) => {
//   const { data } = req.body;
//   const templatename = data.elementName;
//   const receivers = [data.Contact_phone_number]; // Now it's an array
// var customParams = data.Message_Parameters.split('&').map(param => {
//   // return param; // This already is "name=Haris", "tap=wertyu"
//   const [key, value] = param.split('='); // Split each param into key and value
//     return { [key]: value }; 
    
// });

// //console.log(customParams);
//   customParams=JSON.stringify(customParams);
// //console.log(customParams);
//   var requestData = {
//     template_name: templatename,
//     broadcast_name: "string",
//     // Correctly construct the receivers array for the request
//     receivers: receivers.map(whatsappNumber => ({
//       whatsappNumber, // Use this variable correctly
//       customParams // This already is an array of objects {name, value}
//     }))
//   };
//   //requestData==JSON.stringify(requestData);
  
// console.log(requestData);

 const { data } = req.body;
  const templatename = data.elementName;
  const receivers = [data.Contact_phone_number];
    const wai=data.Contact_phone_number;
//   var customParams = data.Message_Parameters.split('&').map(param => {
//     const [key, value] = param.split('=');
//     return { [key]: value };
//   });
// var customParams = data.Message_Parameters.split('&').reduce((acc, param) => {
//     const [key, value] = param.split('=');
//     acc[key] = value; // Assign each key-value pair to the accumulator object
//     return acc;
// }, {});
var customParams = data.Message_Parameters.split('||>').map(param => {
  const [key, value] = param.split('=');
  return { name: key, value: value }; // This aligns with the desired output
});

  var requestData = {
    template_name: templatename,
    broadcast_name: "string",
    receivers: receivers.map(whatsappNumber => ({
      whatsappNumber,
     customParams
    }))
  };
 // console.log(requestData);
  requestData=JSON.stringify(requestData, null, 2);
  try {
 const response = await axios.post('https://live-mt-server.wati.io/Your Tanent ID/api/v2/sendTemplateMessages', requestData, {
      headers: {
        'accept': '*/*',
         'Authorization': 'Your Bearer Token', // Make sure to replace with your actual token
        'Content-Type': 'application/json-patch+json'
      }
    });
    console.log(requestData);
  //  console.log(response.data)
        console.log("This COde Runs Perfectly");
    res.json({ success: true, response: response.data });
  } catch (error) {
    console.log(error.message);
   // console.log(requestData);
    res.status(500).json({ success: false, error: error.message });
  }
});







app.get('/sendTempMessage', async (req, res) => {
    
  const { tenant,templatename,receivers, ...queryParams } = req.query;
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
    const response = await axios.post('https://live-mt-server.wati.io/Your Tanent ID/api/v2/sendTemplateMessages', data, {
      headers: {
        'accept': '*/*',
        'Authorization': 'Your Bearer Token', // Replace YOUR_TOKEN with your actual token
        'Content-Type': 'application/json-patch+json'
      }
    });
    res.json({ success: true, response: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});





// New endpoint for adding a contact
app.get('/addContact', async (req, res) => {
    // Extract 'name' and 'number' from query parameters
    const { tenant,name, number, ...customParamsQuery } = req.query;
    
    // Dynamically generate customParams from the remaining query parameters
    const customParams = Object.entries(customParamsQuery).map(([name, value]) => ({
      name,
      value
    }));
  
    const data = {
      name: name, // Use the 'name' from the query
      customParams: customParams
    };
  
    // Replace 'YOUR_TOKEN' with your actual authorization token
    const config = {
      headers: {
        'accept': '*/*',
        'Authorization': 'Your Bearer Token', 
        'Content-Type': 'application/json-patch+json'
      }
    };
  
    try {
      // The 'number' from the query is appended to the URL
      const response = await axios.post(`https://live-mt-server.wati.io/Your Tanent ID/api/v1/addContact/${number}`, data, config);
      res.json({ success: true, response: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });



// New endpoint for assigning an operator
app.get('/assignOperator', async (req, res) => {
    const { tenant,email, whatsappNumber } = req.query;
  
    // Ensure both email and whatsappNumber are provided
    if (!email || !whatsappNumber) {
      return res.status(400).json({ success: false, message: "Both 'email' and 'whatsappNumber' are required query parameters." });
    }
  
    const config = {
      headers: {
        'accept': '*/*',
        'Authorization': 'Your Bearer Token', // Replace YOUR_TOKEN with your actual token
        'Content-Type': 'application/json-patch+json'
      },
      params: {
        email,
        whatsappNumber
      }
    };
  
    try {
      // Note: Using the POST method but the parameters are passed as query strings
      const response = await axios.post(`https://live-mt-server.wati.io/Your Tanent ID/api/v1/assignOperator`, {}, config);
      res.json({ success: true, response: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

// Endpoint to get message templates
// Endpoint to get message templates and filter the response
// Endpoint to get message templates and filter the response
// Endpoint to get message templates and filter the response for specific templates
app.get('/getMessageTemplates', async (req, res) => {
  const { pageSize = 200, pageNumber = 1,tenant } = req.query; // Default values if not provided
  console.log(tenant);

  const config = {
    headers: {
      'accept': '*/*',
       'Authorization': 'Your Bearer Token'
    },
    params: {
      pageSize,
      pageNumber,
    }
  };

try {
  const response = await axios.get('https://live-mt-server.wati.io/Your Tanent ID/api/v1/getMessageTemplates', config);
  console.log(response.data); // Log the data to see its structure

//   if (response.data && Array.isArray(response.data.messageTemplates)) {
//     const elementNames = response.data.messageTemplates.map(template => template.elementName);
//     res.json({ elementNames });
//   } else {
//     console.log("The expected data was not found in the response.");
//     res.status(500).json({ success: false, message: 'Unexpected response structure from API' });
//   }
if (response.data && Array.isArray(response.data.messageTemplates)) {
  // Initialize an empty array for the options
  let options = [];

  // Iterate through each template and add it to the options array as an object with label and value
  response.data.messageTemplates.forEach((template) => {
    options.push({
      label: template.elementName+ ` -> (${template.status})`,
      value: template.elementName
    });
  });

  // Wrap the options array in an object under the key 'options' and send as JSON response
  res.json({ options });
} else {
  console.log("The expected data was not found in the response.");
  res.status(500).json({ success: false, message: 'Unexpected response structure from API' });
}


} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, error: error.message });
}
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
