from db.startup import get_pool
import json

async def update_userdraft(owner_id,id,name,version,questions):
    POOL = get_pool()

    questions_json = json.dumps([
        question.model_dump(mode="json")
        for question in questions
    ])

    async with POOL.acquire() as conn :
        return await conn.fetchrow(
        '''
        INSERT INTO draft_forms (owner_id, id, name, version, questions)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE
            SET
                name = EXCLUDED.name,
                version = EXCLUDED.version,
                questions = EXCLUDED.questions
            WHERE draft_forms.version < EXCLUDED.version
            RETURNING *; 
        ''' ,owner_id,id,name,version,questions_json
        )
    