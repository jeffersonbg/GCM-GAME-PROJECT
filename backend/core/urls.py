"""
URL configuration for core project.

Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Importes padrão
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions

# Importes da documentação Swagger
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Importes de autenticação
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

# Cabeçalho e permição da documentação do Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API Base",
        default_version='v1',
        description="Documentação da API base com Django REST",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Painel de administrador
    path('admin/', admin.site.urls),

    # Documentação via Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    # Endpoints de auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # Registro de outras apps
    path('api/accounts/', include('accounts.urls')),

]
