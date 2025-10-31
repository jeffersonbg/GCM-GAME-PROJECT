from rest_framework import serializers
from .models import Pergunta, Alternativa


class AlternativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternativa
        fields = ['id', 'texto', 'is_correta']


class PerguntaSerializer(serializers.ModelSerializer):
    alternativas = AlternativaSerializer(many=True, read_only=True)

    class Meta:
        model = Pergunta
        fields = ['id', 'texto', 'tipo', 'alternativas']
