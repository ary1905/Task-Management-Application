from django.db import models
from datetime import timedelta, datetime
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email
    
def default_due_date():
    return datetime.now() + timedelta(days=1)

class UserAccountTasks(models.Model):
    email = models.EmailField(max_length=254)
    id = models.AutoField(primary_key=True)
    task_title = models.TextField(max_length=1024)
    task_type = models.TextField(max_length=255)
    task_add_date = models.DateField(auto_now=False, auto_now_add=True)
    task_due_date = models.DateField(default=default_due_date)
    task_id = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.task_id is None:
            task_count = UserAccountTasks.objects.filter(email=self.email).count()
            self.task_id = task_count + 1
        super().save(*args, **kwargs)

    