from db.startup import get_pool
from uuid import UUID

async def get_userdata(id : UUID) :
    POOL = get_pool()
    async with POOL.acquire() as conn :
        return await conn.fetch(
            '''
            SELECT (
                SELECT * FROM draft_forms
                WHERE owner_id = $1
            ) as draft_forms

            (
                SELECT * FROM publish_form
                WHERE owner_id = $1
            ) as publish_forms
            ''',id
        )

