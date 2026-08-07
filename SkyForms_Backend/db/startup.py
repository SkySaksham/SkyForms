import asyncpg
import asyncio
from config import DATABASE_URL

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

def get_pool():
    if POOL is None:
        raise RuntimeError("Database not connected")
    return POOL


if (__name__ == "__main__") :
    asyncio.run(connect_db())