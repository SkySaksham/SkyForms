from pydantic import BaseModel

class GoogleIdToken(BaseModel) :
    id_token : str