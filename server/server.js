import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import openai from 'openai';

dotenv.config();

console.log(process.env.OPENAI_API_KEY);

openai.apiKey = process.env.OPENAI_API_KEY;

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
    const prompt = req.body.prompt;

    const response = await openai.ChatCompletion.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    res.status(200).send({
      bot: response.data.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));