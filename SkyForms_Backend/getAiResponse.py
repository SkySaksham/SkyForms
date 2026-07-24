from groq import Groq # type: ignore
from pydantic import BaseModel,Field
from typing import List,Literal
from dotenv import load_dotenv

import os

load_dotenv()  

groq_api_key = os.getenv("GROQ_API_KEY")





class ValidQuestion(BaseModel):
    title: str = Field(
        description="The question displayed to the applicant."
    )

    description: str = Field(
        description="Optional helper text. Use an empty string if none."
    )

    type: Literal[
        "short",
        "paragraph",
        "date",
        "checkbox"
    ] = Field(
        description="The type of input field."
    )

    required: bool = Field(
        description="Whether answering this question is mandatory."
    )

class ValidQuestions(BaseModel) :
    questions : List[ValidQuestion]


prompt = '''
You are an AI form generation assistant.

Given a description of a form, generate a complete set of relevant form questions. Create questions that are clear, concise, and appropriate for the form's purpose. Avoid duplicate or unnecessary questions. Select the most suitable input type for each question and mark only essential questions as required. Leave the description empty unless additional instructions are genuinely helpful.

Return only valid JSON that strictly follows the provided schema.
'''

client = Groq(api_key=groq_api_key)


def getAiResponse(userInput :str) ->ValidQuestions :
    chat_completion = client.chat.completions.create(
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

