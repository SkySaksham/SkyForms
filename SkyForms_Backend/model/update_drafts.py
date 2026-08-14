from pydantic import BaseModel,Field
from typing import List,Literal
from model.llm_response import ValidQuestion
from uuid import UUID

class ValidQuestion(BaseModel):
    id: UUID
    title: str
    description: str = ""
    type: Literal["short", "paragraph", "date", "checkbox"]
    required: bool


class Update_Draft_Schema(BaseModel):
    name: str
    owner_id: UUID
    id: UUID
    version: int
    questions: List[ValidQuestion]