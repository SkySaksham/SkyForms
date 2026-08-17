from db.startup import get_pool
from uuid import UUID

async def get_draft_forms(id :UUID) :
        POOL = get_pool()
        async with POOL.acquire() as conn :
            rows = await conn.fetch(
                "SELECT * FROM draft_forms WHERE owner_id = $1",id
            )
            if rows == [] : return None
            return (rows)

async def get_publish_forms(id :UUID) :
            POOL = get_pool()
            async with POOL.acquire() as conn :
                rows = await conn.fetch(
                    "SELECT * FROM publish_form WHERE owner_id = $1",id
                )
                if rows == [] : return None
                return (rows)
     



async def get_userdata(id : UUID) :
    draft = await get_draft_forms(id)
    publish = await get_publish_forms(id)

    print (draft)
    print (publish)

    res = {"draft" : {}, "publish" : {}}
    if (draft) : res["draft"] = draft
    if (publish) : res["publish"] = publish

    return res

    

