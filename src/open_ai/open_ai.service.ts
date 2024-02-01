import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

const getApiKey = () => {
    return process.env.OPENAI_API_KEY;
}


@Injectable()
export class OpenAiService {
    static askQuestion = async (question: string) => {
        const openai = new OpenAI({
            apiKey: getApiKey(),
            dangerouslyAllowBrowser: true
        });
        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }]
        });
        return gptResponse.choices[0].message.content || "Something went wrong";
    }


    static askInStream = async (question: string, callBack: (input: string | null | undefined) => void) => {
        const openai = new OpenAI({
            apiKey: getApiKey(),
            dangerouslyAllowBrowser: true
        });
        const gptStream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [{ role: 'user', content: question }]
        });
        let index = 0;
        for await (const chunk of gptStream) {
            callBack(chunk.choices[0]?.delta?.content);
            console.log(index + "|| " + chunk.choices[0]?.delta?.content + " ||")
            index++;
        }
    }
}

/* gptResponse format
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
