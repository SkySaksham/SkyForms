import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OUTH_CLIENT_ID_GOOGLE = os.getenv("OUTH_CLIENT_ID")
DATABASE_URL = os.getenv("DATABASE_URL")