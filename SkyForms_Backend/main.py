# we GONNA MAKE end point for prompt to draft form first...
from fastapi import FastAPI
from pydantic import BaseModel

class Data (BaseModel):
        a: float
        b: float

app = FastAPI()

@app.get("/")
def home():
    return {"message": "App Running !!"}

@app.post("/multiply")
def multiply(data:Data):  
        return {"result" :data.a * data.b}
    
