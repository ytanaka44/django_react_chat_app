from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    first_name = models.CharField(max_length=50, default='Anonymous')
    last_name = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=100, unique=True)
    bio = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="user_icons", default="default.jpg")
    verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    session_token = models.CharField(max_length=10, default=0)

    # a admin user; non super-user
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
