import asyncpg
import asyncio
from config import DATABASE_URL
import json

POOL = None

async def init_connection(conn):
    await conn.set_type_codec(
        "jsonb",
        encoder=json.dumps,
        decoder=json.loads,
        schema="pg_catalog",
    )


async def connect_db() :
    try :
        global POOL
        POOL = await asyncpg.create_pool(
            DATABASE_URL,
            min_size=2,
            max_size=10,
            init=init_connection
        )
        print("DATABASE CONNECTED !!")
    except Exception as e :
        print ("Failed TO Connect",e)

def get_pool():
    if POOL is None:
        raise RuntimeError("Database not connected")
    return POOL


if (__name__ == "__main__") :
    asyncio.run(connect_db())