// Node.js (server.js)
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { OpenAI} from 'openai'; // Assuming OpenAI is exported as OpenAIAPI in openai.mjs

const app = express();
const PORT = process.env.PORT || 5000;
const API = process.env.CHAT_API
const openai = new OpenAI({ apiKey: API });

app.use(cors());
app.use(express.json());

app.post('/question', async (req, res) => {
  try {
    const { question } = req.body;
    console.log(question)
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);

    // Use OpenAI
    // const answer = await openai.ask(question);

     res.json({answer:completion.choices[0].message.content });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    res
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});