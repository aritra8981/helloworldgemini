// Make sure to include these imports:

const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import the GoogleGenerativeAI class from the package
const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World Gemini!");
});

const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "what is the value of pi in maths?";

const generate = async (prompt) => {
  try{
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  }catch(err){
    console.error(err);
  }
}

// generate();


app.get('/api/content', async (req, res) => {
    try{
        const data = req.body.question;
        const result = await generate(data);
        res.send({
            "result": result 
        });
    }catch(err){
        console.error(err);
        res.status(500).send("Error in generating content");
    }
}); 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
