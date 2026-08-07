import jwt
from config import JWT_ALGORITHM,JWT_SECRET
from datetime import datetime, timedelta, timezone


def create_jwt(user_id :str) ->str :
    payload = {
            "sub": user_id,
            "iat": datetime.now(timezone.utc),
            "exp": datetime.now(timezone.utc) + timedelta(days=30),
        }
    return jwt.encode(
            payload,
            JWT_SECRET,
            algorithm=JWT_ALGORITHM,
        )


def verify_jwt(token: str):
    try:
        return jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
        )
    except (jwt.InvalidTokenError):
        return None