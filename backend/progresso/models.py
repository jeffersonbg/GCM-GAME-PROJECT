from django.db import models
from django.conf import settings

class Progresso(models.Model):
    """
    Representa o estado atual do jogo de um jogador.
    """
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='progresso'
    )
    arvores = models.PositiveIntegerField(default=5, help_text="Quantidade atual de árvores.")
    meta_arvores = models.PositiveIntegerField(default=10, help_text="Meta de árvores para vencer.")
    acertos_consecutivos = models.PositiveIntegerField(default=0, help_text="Acertos consecutivos até plantar uma árvore.")
    total_acertos = models.PositiveIntegerField(default=0)
    total_erros = models.PositiveIntegerField(default=0)
    fase_atual = models.PositiveIntegerField(default=1)

    atualizado_em = models.DateTimeField(auto_now=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Progresso de {self.usuario.username}"

    def registrar_acerto(self):
        """Incrementa acertos e aplica regra de plantio."""
        self.total_acertos += 1
        self.acertos_consecutivos += 1
        if self.acertos_consecutivos >= 3:
            self.plantar_arvore()
            self.acertos_consecutivos = 0
        self.save()

    def registrar_erro(self):
        """Incrementa erros e aplica regra de corte."""
        self.total_erros += 1
        self.cortar_arvore()
        self.acertos_consecutivos = 0
        self.save()

    def plantar_arvore(self):
        """Planta uma árvore."""
        self.arvores += 1
        self.save()

    def cortar_arvore(self):
        """Corta uma árvore (não deixa ir abaixo de zero)."""
        if self.arvores > 0:
            self.arvores -= 1
        self.save()

    @property
    def jogo_finalizado(self):
        """Verifica se o jogo terminou (vitória ou derrota)."""
        if self.arvores == 0:
            return "derrota"
        elif self.arvores >= self.meta_arvores:
            return "vitoria"
        return None
