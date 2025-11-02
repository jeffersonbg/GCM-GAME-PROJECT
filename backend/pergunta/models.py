from django.db import models


class Pergunta(models.Model):
    """
    Model que representa uma pergunta
    """
    TIPO_VERDADEIRO_FALSO = 'VF'
    TIPO_MULTIPLA_ESCOLHA = 'ME'

    TIPO_PERGUNTA_CHOICES = [
        (TIPO_VERDADEIRO_FALSO, 'Verdadeiro ou Falso'),
        (TIPO_MULTIPLA_ESCOLHA, 'Múltipla Escolha'),
    ]

    texto = models.TextField(verbose_name="Enunciado da Pergunta")
    tipo = models.CharField(
        max_length=2,
        choices=TIPO_PERGUNTA_CHOICES,
        default=TIPO_MULTIPLA_ESCOLHA,
        verbose_name="Tipo de Pergunta"
    )
    correta = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Resposta Correta (para VF ou identificação interna)"
    )

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.texto[:70]


class Alternativa(models.Model):
    """
    Model que representa uma alternativa e que liga perguntas com alterntivas
    """
    pergunta = models.ForeignKey(
        Pergunta,
        on_delete=models.CASCADE,
        related_name='alternativas'
    )
    texto = models.CharField(max_length=255)
    is_correta = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.texto} ({'Correta' if self.is_correta else 'Errada'})"
