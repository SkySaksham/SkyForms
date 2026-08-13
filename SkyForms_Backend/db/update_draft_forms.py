from db.startup import get_pool

async def update_userdraft(owner_id,id,name,version,data):
    POOL = get_pool()

    async with POOL.acquire() as conn :
        return await conn.fetchrow(
        '''
        INSERT INTO draft_form (owner_id, id, name, version, data)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE
            SET
                name = EXCLUDED.name,
                version = EXCLUDED.version,
                data = EXCLUDED.data
            WHERE draft_form.version < EXCLUDED.version
            RETURNING *; 
        ''' ,owner_id,id,name,version,data
        )
    