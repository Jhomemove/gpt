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
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'I am a Homemove advisor called Homer. If you ask me a question that is rooted in Homemove advice, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "this requires expert advice, our homemove advisor will be in touch".',
        },
        { role: 'user', content: req.body.message },
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
