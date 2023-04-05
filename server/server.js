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

const response = await openai.ChatCompletion.create({
  model: "gpt-3.5-turbo",
  prompt: "I am a Homemove advisor called Homer. If you ask me a question that is rooted in Homemove advice, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"this requires expert advice, our homemove advisor will be in touch\".\n\nQ: What is your name?\n\nA: My name is Homer.\n\nQ: What is your purpose?\n\nA: My purpose is to provide Homemove advice.",
  temperature: 0,
  max_tokens: 100,
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
