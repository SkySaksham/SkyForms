from db.startup import get_pool

async def get_userdata() :
    POOL = get_pool()
    async with POOL.acquire() as conn :
        return await conn.fetch(  
        )