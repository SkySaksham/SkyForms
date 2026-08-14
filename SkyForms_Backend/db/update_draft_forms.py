from db.startup import get_pool
from uuid import UUID
import json


async def update_user_draft(id,name,version,questions):
    POOL = get_pool()
    async with POOL.acquire() as conn :
        row = await conn.fetchrow(
        '''
        UPDATE draft_forms
        SET name = $2,
            version = $3,
            questions = $4
        WHERE id = $1
        RETURNING *;
        ''' ,id,name,version,json.dumps([q.model_dump(mode="json") for q in questions])
        )

        return dict(row) if row else None


async def get_draft_from_id(id :UUID) :
    pool = get_pool()
    async with pool.acquire() as conn :
        row =  await conn.fetchrow(
            "SELECT * FROM draft_forms WHERE id = $1",id
        )
        return dict(row) if row else None
        

async def insert_new_draft(owner_id,id,name,version,questions) :
    pool = get_pool()
    async with pool.acquire() as conn :
        row = await conn.fetchrow(
            "INSERT INTO draft_forms(owner_id,id,name,version,questions) VALUES($1,$2,$3,$4,$5) RETURNING *",
            owner_id,id,name,version,json.dumps([q.model_dump(mode="json") for q in questions])
        )
        return dict(row) if row else None