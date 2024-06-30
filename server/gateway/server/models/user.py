from datetime import datetime
from typing_extensions  import Annotated, Any, Optional

from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr


class UserAuth(BaseModel):
    """User register and login auth."""

    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    """Updatable user fields."""

    email: Optional[EmailStr] = None

    # User information
    first_name: Optional[str] = None
    last_name: Optional[str]  = None


class UserOut(UserUpdate):
    """User fields returned to the client."""

    email: Annotated[str, Indexed(EmailStr, unique=True)]
    disabled: bool = False


class User(Document, UserOut):
    """User DB representation."""

    password: str

    def __repr__(self) -> str:
        return f"<User {self.email}>"

    def __str__(self) -> str:
        return self.email

    def __hash__(self) -> int:
        return hash(self.email)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False

    @property
    def created(self) -> Optional[datetime] :
        """Datetime user was created from ID."""
        return self.id.generation_time if self.id else None

    @property
    def jwt_subject(self) -> "dict[str, Any]":
        """JWT subject fields."""
        return {"username": self.email}

    @classmethod
    async def by_email(cls, email: str) -> Optional["User"]:
        """Get a user by email."""
        return await cls.find_one(cls.email == email)

    def update_email(self, new_email: str) -> None:
        """Update email logging and replace."""
        # Add any pre-checks here
        self.email = new_email
