from rest_framework import viewsets, permissions
from accounts.models import User
from accounts.serializers.user_serializers import UserSerializer


class IsCreateOrAuthenticated(permissions.BasePermission):
    """
    Permite criar usuário sem autenticação (POST),
    mas exige login para todos os outros métodos.
    """
    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return request.user and request.user.is_authenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsCreateOrAuthenticated]
