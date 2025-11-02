# Imports padrão
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Model de usuario herdar de abstractUsers
    """
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
