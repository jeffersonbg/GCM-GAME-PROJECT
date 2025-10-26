import pytest
from rest_framework import status
from rest_framework.test import APIClient
from pergunta.models import Pergunta, Alternativa


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def pergunta_com_alternativas(db):
    pergunta = Pergunta.objects.create(
        texto="A Amazônia é o maior bioma terrestre do mundo?",
        tipo="VF"
    )
    Alternativa.objects.create(pergunta=pergunta, texto="Verdadeiro", is_correta=True)
    Alternativa.objects.create(pergunta=pergunta, texto="Falso", is_correta=False)
    return pergunta


@pytest.mark.django_db
def test_criar_pergunta(api_client):
    """
    RF03 - O sistema deve permitir cadastrar perguntas com alternativas.
    """
    payload = {
        "texto": "ODS 15 está relacionada à vida terrestre?",
        "tipo": "VF"
    }
    response = api_client.post("/api/pergunta/perguntas/", payload, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert Pergunta.objects.filter(texto__icontains="ODS 15").exists()


@pytest.mark.django_db
def test_listar_perguntas(api_client, pergunta_com_alternativas):
    """
    RF03 - O sistema deve exibir perguntas e suas alternativas.
    """
    response = api_client.get("/api/pergunta/perguntas/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) >= 1
    assert "texto" in data[0]


@pytest.mark.django_db
def test_pergunta_aleatoria(api_client, pergunta_com_alternativas):
    """
    RF03 - Deve retornar uma pergunta aleatória do banco de dados.
    """
    response = api_client.get("/api/pergunta/perguntas/aleatoria/")
    assert response.status_code == status.HTTP_200_OK
    assert "texto" in response.data
    assert "alternativas" in response.data


@pytest.mark.django_db
def test_pergunta_aleatoria_sem_perguntas(api_client):
    """
    RF03 - Se não houver perguntas, deve retornar status 404.
    """
    response = api_client.get("/api/pergunta/perguntas/aleatoria/")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "Nenhuma pergunta cadastrada" in str(response.data)
