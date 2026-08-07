# we GONNA MAKE end point for prompt to draft form first...
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.get_questions_llm import get_ai_response
from services.verify_google_id_token import verify_id_token_jwt

from model.llm_response import llm_form_request
from model.google_id_token import GoogleIdToken

import db.startup as db
from db.user import get_user_from_email, create_user

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
async def home():
    if (db.POOL) :
        return {"message": "App Running !!","idle conn":db.POOL.get_idle_size()}
    raise HTTPException(status_code=500, detail="APP's Not Up Well !!")

@app.post("/llm_form")
async def get_llm_form(request :llm_form_request):
        try : 
                return await get_ai_response(request.prompt)
        except Exception as e:
                print(e)  
                raise HTTPException(
                        status_code=500,
                        detail="Failed to generate form. Please try again."
                )

@app.post("/auth/signin")
async def auth_signin(request :GoogleIdToken) :
        try :
            idinfo = verify_id_token_jwt(request.id_token)
        except Exception as e :
            print (e)
            raise HTTPException (status_code=401,detail="Invalid Google ID token")
        try :
            user_info = await get_user_from_email(idinfo["email"])
            if (user_info is None) : user_info = await create_user(idinfo["name"],idinfo["email"])
            print(user_info)

            return {"userInfo":dict(user_info)}
        except Exception as e :
                    print (e)
                    raise HTTPException (status_code=500,detail="InterNal Server Error")
        


