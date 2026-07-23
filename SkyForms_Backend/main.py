# we GONNA MAKE end point for prompt to draft form first...




from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "App Running !!"}

@app.get("/multiply")
def multiply(a:float,b:float):  
        return {"result" :a*b}
    
