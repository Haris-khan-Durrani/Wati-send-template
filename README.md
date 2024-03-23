# API Documentation
This documentation provides an overview of the endpoints and functionalities of the API implemented in the provided code.

## Base URL
```bash
http://localhost:3010
```
### Endpoints
#### 1. POST /sendTemplateMessage
Description: Sends a template message to specified WhatsApp numbers.
Request Payload:
json
```bash
{
  "elementName": "string",
  "Contact_phone_number": "string",
  "Message_Parameters": "string"
}
```
Response Payload:
json
```bash
{
  "success": true|false,
  "response": "string"
}
```
#### 2. GET /sendTempMessage
Description: Sends a template message using query parameters.
Query Parameters:
tenant: Your tenant ID
templatename: Name of the template
receivers: WhatsApp number of the receiver
Additional parameters for message customization
##### Response Payload:
json
```bash
{
  "success": true|false,
  "response": "string"
}
```
#### 3. GET /addContact
Description: Adds a contact using query parameters.
Query Parameters:
tenant: Your tenant ID
name: Name of the contact
number: WhatsApp number of the contact
Additional custom parameters
Response Payload:
json
```bash
{
  "success": true|false,
  "response": "string"
}
```
#### 4. GET /assignOperator
Description: Assigns an operator to a WhatsApp number.
Query Parameters:
tenant: Your tenant ID
email: Email of the operator
whatsappNumber: WhatsApp number to assign the operator
Response Payload:
json
```bash
{
  "success": true|false,
  "response": "string"
}
```
#### 5. GET /getMessageTemplates
Description: Retrieves message templates.
Query Parameters:
pageSize: Number of templates per page (default: 200)
pageNumber: Page number to retrieve (default: 1)
tenant: Your tenant ID
Response Payload:
json
Copy code
{
  "options": [
    {
      "label": "Template Name -> (Status)",
      "value": "Template Name"
    },
    ...
  ]
}

#### Authentication
All endpoints require a bearer token in the Authorization header.
Replace "Your Bearer Token" with your actual token.
Error Handling
In case of errors, the API returns a JSON response with success as false and an error message.
HTTP status code 500 indicates internal server errors.
HTTP status code 400 indicates client errors such as missing parameters.

#### Additional Notes
Ensure to replace placeholders such as "Your Tenant ID", "Your Bearer Token", and "string" with actual values.
The API communicates with an external server at https://live-mt-server.wati.io for certain operations.

Logging and middleware functions are available but commented out. You can uncomment them for debugging purposes.
This documentation assumes familiarity with RESTful API concepts and HTTP methods.
