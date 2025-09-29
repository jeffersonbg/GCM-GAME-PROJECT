# Imports padrão
from django.contrib.auth.models import AbstractUser
from django.db import models

# Adicionar novos imports a baixo


class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
