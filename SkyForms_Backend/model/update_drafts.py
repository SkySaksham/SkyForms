from pydantic import BaseModel,Field
from typing import List,Literal
from model.llm_response import ValidQuestions

class Update_Draft_Schema(BaseModel) :
    name: str
    owner_id : str
    id : str
    version : int
    questions : ValidQuestions