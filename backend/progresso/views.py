from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Progresso
from .serializers import ProgressoSerializer


class ProgressoViewSet(viewsets.ModelViewSet):
    """
    Gerencia o progresso do jogo do usuário logado.
    """
    serializer_class = ProgressoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Progresso.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['post'], url_path='acerto')
    def registrar_acerto(self, request):
        progresso, _ = Progresso.objects.get_or_create(usuario=request.user)
        progresso.registrar_acerto()
        serializer = self.get_serializer(progresso)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='erro')
    def registrar_erro(self, request):
        progresso, _ = Progresso.objects.get_or_create(usuario=request.user)
        progresso.registrar_erro()
        serializer = self.get_serializer(progresso)
        return Response(serializer.data)
