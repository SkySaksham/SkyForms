from typing import List, Literal
from pydantic import BaseModel, Field, ConfigDict


class ValidQuestion(BaseModel):
    model_config = ConfigDict(extra="forbid")

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


class ValidQuestions(BaseModel):
    model_config = ConfigDict(extra="forbid")

    questions: List[ValidQuestion]


class llm_form_request(BaseModel):
    prompt: str