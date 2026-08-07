from groq import Groq # type: ignore
from dotenv import load_dotenv
import os
from model.llm_response import ValidQuestion, ValidQuestions
from config import GROQ_API_KEY

 


prompt = '''
You are an AI form generation assistant.
Given a description of a form, generate a complete set of relevant form questions. Create questions that are clear, concise, and appropriate for the form's purpose. Avoid duplicate or unnecessary questions.
Select the most suitable input type for each question and mark only essential questions as required. Leave the description empty unless additional instructions are genuinely helpful.
Return only valid JSON that strictly follows the provided schema.
'''

client = Groq(api_key=GROQ_API_KEY)


async def get_ai_response(userInput :str) ->ValidQuestions :
    chat_completion = await client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "user",
                "content": userInput,
            }
        ],
        model="openai/gpt-oss-120b",
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "valid_form_question",
                "schema": ValidQuestions.model_json_schema()
            }
        }
    )

    return ValidQuestions.model_validate_json(
        chat_completion.choices[0].message.content
    )

