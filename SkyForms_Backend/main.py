# we GONNA MAKE end point for prompt to draft form first...
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from get_questions_llm import getAiResponse
from schema.llm_response import llm_form_request

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "App Running !!"}

@app.post("/llm_form")
def get_llm_form(request :llm_form_request):
        try : 
                return getAiResponse(request.prompt)
        except Exception as e:
                print(e)  
                raise HTTPException(
                        status_code=500,
                        detail="Failed to generate form. Please try again."
                )




