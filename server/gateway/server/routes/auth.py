from fastapi import APIRouter, HTTPException, Security
from fastapi_jwt import JwtAuthorizationCredentials

from  models.auth import AccessToken, RefreshToken
from  models.user import User, UserAuth
from  jwt import access_security, refresh_security
from  hash.password import hash_password


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(user_auth: UserAuth) -> RefreshToken:
    """Authenticate and returns the user's JWT."""
    user = await User.by_email(user_auth.email)
    if user is None or hash_password(user_auth.password) != user.password:
        raise HTTPException(status_code=401, detail="Bad email or password")
    access_token = access_security.create_access_token(user.jwt_subject)
    refresh_token = refresh_security.create_refresh_token(user.jwt_subject)
    return RefreshToken(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh")
async def refresh(
    auth: JwtAuthorizationCredentials = Security(refresh_security),
) -> AccessToken:
    """Return a new access token from a refresh token."""
    access_token = access_security.create_access_token(subject=auth.subject)
    return AccessToken(access_token=access_token)

@router.post("/signup")
async def refresh(
    user: UserAuth
) -> User:
    """Return a new access token from a refresh token."""
    dbUser = await User.insert(User(email=user.email,password=hash_password(user.password) ))
    return dbUser
