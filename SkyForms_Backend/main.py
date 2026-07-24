# we GONNA MAKE end point for prompt to draft form first...
from fastapi import FastAPI
from pydantic import BaseModel
from getAiResponse import getAiResponse

class AiFormRequest(BaseModel):
    prompt: str

app = FastAPI()

@app.get("/")
def home():
    return {"message": "App Running !!"}

@app.post("/AiForm")
def getAiForm(request :AiFormRequest):  
        return getAiResponse(request.prompt)
    
