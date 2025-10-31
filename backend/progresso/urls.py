from rest_framework.routers import DefaultRouter
from .views import ProgressoViewSet

router = DefaultRouter()
router.register(r'progresso', ProgressoViewSet, basename='progresso')

urlpatterns = router.urls
