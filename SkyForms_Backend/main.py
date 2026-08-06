# we GONNA MAKE end point for prompt to draft form first...
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.get_questions_llm import getAiResponse
from model.llm_response import llm_form_request
from model.google_id_token import GoogleIdToken
import db.startup as db
import asyncio
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect_db()
    print("Database connected")

    yield
    await db.POOL.close()

app = FastAPI(lifespan=lifespan)


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
    if (db.POOL) :
        return {"message": "App Running !!","idle conn":db.POOL.get_idle_size()}
    raise HTTPException(status_code=500, detail="APP's Not Up Well !!")

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

@app.post("/auth/signin")
def auth_signin(request :GoogleIdToken) :
      return {"msg":"Recieved"}



