// Node.js (server.js)
import express from 'express';
import cors from 'cors';
import { OpenAI} from 'openai'; // Assuming OpenAI is exported as OpenAIAPI in openai.mjs

const app = express();
const PORT = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: "sk----key" });

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

    

     res.json({answer:completion.choices[0].message.content });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
