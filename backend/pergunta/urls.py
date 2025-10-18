from rest_framework.routers import DefaultRouter
from .views import PerguntaViewSet

router = DefaultRouter()
router.register(r'perguntas', PerguntaViewSet, basename='pergunta')

urlpatterns = router.urls
