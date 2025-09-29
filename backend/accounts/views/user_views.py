from rest_framework import viewsets
from accounts.models import User
from accounts.serializers.user_serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
