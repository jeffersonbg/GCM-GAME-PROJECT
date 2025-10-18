from rest_framework import serializers
from .models import Progresso

class ProgressoSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)
    jogo_finalizado = serializers.ReadOnlyField()

    class Meta:
        model = Progresso
        fields = [
            'id', 'usuario', 'arvores', 'meta_arvores',
            'acertos_consecutivos', 'total_acertos', 'total_erros',
            'fase_atual', 'jogo_finalizado', 'atualizado_em'
        ]
