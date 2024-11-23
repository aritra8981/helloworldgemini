
# Google Gemini Integration in a Node.js Application
This project demonstrates how to integrate Google Gemini AI (Generative AI) into a Node.js application. It uses the @google/generative-ai package for communication with the Gemini model to generate AI-based content.

## Features
API to generate content using the Google Gemini Generative AI model.
RESTful endpoint for user interaction with the AI model.
Basic setup for a Node.js server using Express.

## Prerequisites
Node.js installed on your machine.
Google Generative AI API Key.
Environment configuration file (.env) with the following variable:

API_KEY=<your-google-generative-ai-api-key>


## Installation
1. **Clone the repository**:
 ```bash```
 git clone <repository-url>
 cd <repository-folder>

2. **Install dependencies**:

```bash```
npm install

3. **Setup environment variables**: Create a .env file in the root of the project and add your Google Generative AI API Key:

```plaintext```


API_KEY=your_api_key_here

4. Run the application:

```bash```
node app.js

## API Endpoints
Root Endpoint
URL: /
Method: GET
Response:
"Hello World Gemini!"
Generate Content
URL: /api/content
Method: GET
Request Body:
json
Copy code
{
  "question": "What is the value of pi in maths?"
}
Response:
json
Copy code
{
  "result": "The value of pi is approximately 3.14159..."
}
Code Highlights
GoogleGenerativeAI Initialization:

javascript
Copy code
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
Generate Content Function:

javascript
Copy code
const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (err) {
    console.error(err);
  }
};
API to Generate Content:

javascript

app.get('/api/content', async (req, res) => {
  try {
    const data = req.body.question;
    const result = await generate(data);
    res.send({ "result": result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in generating content");
  }
});
Running the Application
Start the server:

bash
Copy code
node app.js
Test the API using tools like Postman or CURL:

Example request:
bash
Copy code
curl -X GET http://localhost:3000/api/content -H "Content-Type: application/json" -d '{"question":"What is the value of pi?"}'
Dependencies
@google/generative-ai: Communicates with Google Gemini API.
body-parser: Parses incoming request bodies.
dotenv: Loads environment variables from a .env file.
express: Node.js framework for building web applications.
## Project Structure

├── app.js          # Main application file
├── package.json    # Project dependencies and scripts
├── .env            # API key for Google Gemini
└── README.md       # Project documentation
Notes
Ensure your .env file is not included in version control for security purposes.
The API key must have proper permissions for accessing the Gemini model.
License
This project is open-source. You are free to use and modify it as per your requirements.

