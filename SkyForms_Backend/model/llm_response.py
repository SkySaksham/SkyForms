from pydantic import BaseModel,Field
from typing import List,Literal



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

class llm_form_request(BaseModel):
    prompt: str
