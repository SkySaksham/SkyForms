from db.startup import get_pool
import asyncpg


async def submit_draft_form(owner_id, id, name, data):
    pool = get_pool()

    async with pool.acquire() as conn:
        try:
            row = await conn.fetchrow(
                """
                INSERT INTO publish_form(owner_id, id, name, data)
                VALUES($1, $2, $3, $4)
                RETURNING *;
                """,
                owner_id,
                id,
                name,
                [q.model_dump(mode="json") for q in data]
            )

            return dict(row) if row else None

        except asyncpg.UniqueViolationError:
            return "duplicate"