import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Homer!',
  });
});

app.post('/', async (req, res) => {
  try {
    const messages = [
      { role: 'system', content: 'You are a helpful AI home move advisor.' },
      { role: 'user', content: 'Hello, who are you?' },
      { role: 'assistant', content: 'I am Homer, created by Homemove. How can I help you today?' },
      { role: 'user', content: 'What is your purpose?' },
      { role: 'assistant', content: 'My purpose is to provide help and advice on making the home moving process easier. I can provide expert tips, advice, and resources on topics related to packing, budgeting, staging, and much more.' },
      ];

      const response = await openai.ChatCompletion.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 1,
        max_tokens: 500,
      });
      
      res.status(200).send({
        bot: response.choices[0].message.content.trim(),
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error || 'Something went wrong');
      }
      });
      
      app.listen(5000, () => console.log('AI server started on http://localhost:5000'));