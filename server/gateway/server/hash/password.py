import bcrypt

from  config import CONFIG

# print(bcrypt.gensalt()) 
def hash_password(password: str) -> str:
    """Return a salted password hash."""
    return bcrypt.hashpw(password.encode(), CONFIG.salt).decode()
