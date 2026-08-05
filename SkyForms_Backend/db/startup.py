import os
from dotenv import load_dotenv
import asyncpg
import asyncio

load_dotenv()



DATABASE_URL = os.getenv("DATABASE_URL")
POOL = None



async def connect_db() :
    try :
        global POOL
        POOL = await asyncpg.create_pool(
            DATABASE_URL,
            min_size=2,
            max_size=10
        )
    except Exception as e :
        print ("Failed TO Connect",e)


if (__name__ == "__main__") :
    asyncio.run(connect_db())