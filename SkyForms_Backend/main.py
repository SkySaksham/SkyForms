from fastapi import FastAPI, HTTPException, Response, Request
from fastapi.middleware.cors import CORSMiddleware


from services.get_questions_llm import get_ai_response
from services.verify_google_id_token import verify_id_token_jwt
from services.create_verify_jwt import create_jwt,verify_jwt


from model.llm_response import llm_form_request
from model.google_id_token import GoogleIdToken
from model.update_drafts import Update_Draft_Schema

import db.startup as db
from db.startup import connect_db
from db.user import get_user_from_email, create_user
from db.update_draft_forms import update_userdraft

from contextlib import asynccontextmanager
from uuid import UUID


@asynccontextmanager
async def lifespan(app: FastAPI):

    await connect_db()
        

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
async def auth_signin(request: GoogleIdToken, response: Response) :
        try :
            idinfo = verify_id_token_jwt(request.id_token)
        except Exception as e :
            print (e)
            raise HTTPException (status_code=401,detail="Invalid Google ID token")
        try :
            user_info = await get_user_from_email(idinfo["email"])
            if (user_info is None) : user_info = await create_user(idinfo["name"],idinfo["email"])

            print(user_info)

            access_token = create_jwt(str(user_info["id"]))

            response.set_cookie(
                  key = "access_token",
                  value=access_token,
                  httponly=True,
                  samesite="lax",
                  secure=False, # currenty for dev
                  max_age=30 * 24 * 60 * 60
            )

            return {"userInfo":dict(user_info)}
        except Exception as e :
                    print (e)
                    raise HTTPException (status_code=500,detail="InterNal Server Error")
        



@app.get("/auth/verify")
async def verify_access_token(request: Request) :
    access_token = request.cookies.get("access_token")
    if access_token is None: raise HTTPException(status_code=401,detail="Missing access token")

    payload = verify_jwt(access_token)
    if (payload is None) : raise HTTPException(status_code=401, detail="Invalid/Expired access token")
    print (str(payload["sub"]))
    return {"userId":str(payload["sub"])}

      
      

@app.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
        secure=False,
    )

    return {"message": "Logged out"}



@app.post("/updatedraft")
async def update_draft(request :Update_Draft_Schema, http_request : Request) :
    try :
        try :
            access_token = http_request.cookies.get("access_token")
            
            payload = verify_jwt(access_token)
            print (payload["sub"])
            print (request.owner_id)
            if (UUID(payload["sub"]) != request.owner_id) : raise Exception ("RESTRICTED ACCESS!! owner_id Doesnt match with jwt")
            
        except Exception as e :
            print(e)
            raise HTTPException(status_code=401,detail="Invalid/Expired access token")
        
        updated_row = await update_userdraft(request.owner_id,request.id,request.name,request.version,request.questions)
        if updated_row is None:raise HTTPException(status_code=404,detail="Draft not found")
        if (updated_row["owner_id"] != request.owner_id): raise HTTPException(status_code=401,detail = "You Dont Own The Data")
        try:
            validated = Update_Draft_Schema.model_validate(dict(updated_row))
        except Exception as e:
            print("VALIDATION ERROR:")
            print(repr(e))
            print("DATABASE ROW:")
            print(dict(updated_row))

            raise HTTPException(
                status_code=500,
                detail=str(e)
            )
        
        if (validated.questions != request.questions) :
              return {"status" : "Stale","row" : validated}

        return {"status" : "Success", "row" : validated}

    except Exception as e :
         print (e)
         raise HTTPException(status_code=500)


@app.post("/userdata")
async def userdata(response : Response):
    try :
          access_token = response.cookies.get("access_token")
          verify_access_token(access_token)
    except Exception as e :
          print(e)
          raise HTTPException(status_code=401,detail="Invalid/Expired access token")

    # yet to complete




    
        
