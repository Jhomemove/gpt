import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Homer!'
  })
})

app.post('/', async (req, res) => {
  try {
    const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "The following is a conversation with a AI homemove advisor. The Advisor is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am Homer created by Homemove. How can I help you today?\nHuman: What is your purpose?  My purpose is to provide help and advice on making the home moving process easier. I can provide expert tips, advice, and resources on topics related to packing, budgeting, staging, and much more.",
  temperature: 1,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["\n"],
});


    res.status(200).send({
      bot: response.data.choices[0].text.trim()
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
