import pytest
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from progresso.models import Progresso

User = get_user_model()


@pytest.fixture
def usuario(db):
    return User.objects.create_user(
        username="pedro",
        email="pedro@test.com",
        password="senha123"
    )


@pytest.fixture
def api_client_autenticado(usuario):
    client = APIClient()
    client.force_authenticate(user=usuario)
    return client


@pytest.mark.django_db
def test_listar_progresso_usuario(api_client_autenticado, usuario):
    """
    Deve retornar o progresso do usuário autenticado.
    """
    Progresso.objects.create(usuario=usuario)
    outro_usuario = User.objects.create_user(username="outro", email="outro@test.com", password="123")
    Progresso.objects.create(usuario=outro_usuario)

    response = api_client_autenticado.get("/api/progresso/progresso/")
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    assert data.get("usuario") in [usuario.username, str(usuario)]


@pytest.mark.django_db
def test_registrar_acerto(api_client_autenticado, usuario):
    """
    Deve incrementar acertos e eventualmente plantar árvore.
    """
    progresso = Progresso.objects.create(usuario=usuario)

    # Três acertos seguidos devem plantar uma árvore
    for _ in range(3):
        response = api_client_autenticado.post("/api/progresso/progresso/acerto/")
        assert response.status_code == status.HTTP_200_OK

    progresso.refresh_from_db()
    assert progresso.total_acertos == 3
    assert progresso.arvores == 6  # 1 árvore plantada


@pytest.mark.django_db
def test_registrar_erro(api_client_autenticado, usuario):
    """
    Deve incrementar erros e cortar uma árvore (sem ficar negativo).
    """
    progresso = Progresso.objects.create(usuario=usuario, arvores=2)

    response = api_client_autenticado.post("/api/progresso/progresso/erro/")
    assert response.status_code == status.HTTP_200_OK

    progresso.refresh_from_db()
    assert progresso.total_erros == 1
    assert progresso.arvores == 1  # cortou 1 árvore


@pytest.mark.django_db
def test_jogo_finalizado_vitoria_e_derrota(usuario):
    """
    Verifica propriedade jogo_finalizado.
    """
    p1 = Progresso.objects.create(usuario=usuario, arvores=0)
    p2 = Progresso.objects.create(
        usuario=User.objects.create_user(username="vencedor", email="vencedor@test.com", password="123"),
        arvores=10,
        meta_arvores=10
    )

    assert p1.jogo_finalizado == "derrota"
    assert p2.jogo_finalizado == "vitoria"
