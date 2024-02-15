import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

const getAPIKey = () => {
    const api_key = process.env.OPENAI_API_KEY;
    if (api_key === undefined) {
        throw new Error("OpenAI API Key is missing!");
    }
    const pattern = new RegExp("sk-[a-zA-Z0-9]{48}");
    if (!pattern.test(api_key)) {
        throw new Error("OpenAI API Key is not valid!");
    }
    return api_key;
}

@Injectable()
export class OpenAiService {

    testKey = async () => {
        const openai = new OpenAI({
            apiKey: getAPIKey()
        });
    }

    askQuestion = async (question: string) => {
        const openai = new OpenAI({
            apiKey: getAPIKey(),
            //dangerouslyAllowBrowser: true
        });
        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }]
        });
        return gptResponse.choices[0].message.content || "Something went wrong";
    }

    modifyImage = async (prompt: string): Promise<string> => {
        const openai = new OpenAI({
            apiKey: getAPIKey(),
            //dangerouslyAllowBrowser: true
        });
        
        const gptResponse = await openai.images.generate({
            prompt: prompt,
            response_format: 'url',
            model: 'dall-e-2',
            size: '512x512'
        });
        
        const imageUrl: string = gptResponse.data[0].url;
        
        return imageUrl;
    }
}

/* text completion response format
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
        "role": "assistant"
      },
      "logprobs": null
    }
  ],
  "created": 1677664795,
  "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
  "model": "gpt-3.5-turbo-0613",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 17,
    "prompt_tokens": 57,
    "total_tokens": 74
  }
}
*/
