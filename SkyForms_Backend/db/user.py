from db.startup import get_pool

async def get_user_from_email(email) :
    POOL = get_pool()

    async with POOL.acquire() as conn :
        return await conn.fetchrow(
            "SELECT * FROM USERS WHERE EMAIL = $1"
            ,email
        )


async def create_user(name,email) :
    POOL = get_pool()

    async with POOL.acquire() as conn :
        return await conn.fetchrow('''
            INSERT INTO users (name,email)
            VALUES ($1,$2)
            RETURNING *   
        ''',
        name,email
        )

