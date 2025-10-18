import random
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Pergunta
from .serializers import PerguntaSerializer


class PerguntaViewSet(viewsets.ModelViewSet):
    """
    CRUD completo + endpoint para retornar pergunta aleatória.
    """
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'], url_path='aleatoria')
    def pergunta_aleatoria(self, request):
        """
        Retorna uma pergunta aleatória do banco de dados.
        """
        perguntas = list(self.queryset)
        if not perguntas:
            return Response({"detail": "Nenhuma pergunta cadastrada."}, status=404)

        pergunta = random.choice(perguntas)
        serializer = self.get_serializer(pergunta)
        return Response(serializer.data)
