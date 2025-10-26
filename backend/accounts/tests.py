import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user_data():
    return {
        "username": "jogador_teste",
        "email": "teste@example.com",
        "first_name": "Jogador",
        "last_name": "Teste",
        "password": "senha123"
    }


@pytest.mark.django_db
def test_cadastro_usuario(api_client, user_data):
    """
    RF01 - O sistema deve permitir que o usuário se cadastre.
    """
    response = api_client.post("/api/accounts/users/", user_data, format="json")
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(email="teste@example.com").exists()

    user = User.objects.get(email="teste@example.com")
    assert user.check_password("senha123"), "A senha deve estar criptografada e válida."


@pytest.mark.django_db
def test_cadastro_usuario_email_duplicado(api_client, user_data):
    """
    RF01 - O sistema deve impedir o cadastro de e-mail já existente.
    """
    User.objects.create_user(**user_data)
    response = api_client.post("/api/accounts/users/", user_data, format="json")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "email" in response.data or "unique" in str(response.data).lower()


@pytest.mark.django_db
def test_cadastro_usuario_campos_obrigatorios(api_client):
    """
    RF01 - O sistema deve validar campos obrigatórios.
    """
    response = api_client.post("/api/accounts/users/", {}, format="json")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "username" in response.data
    assert "password" in response.data
    assert "email" in response.data


@pytest.mark.django_db
def test_login_usuario(api_client, user_data):
    """
    RF02 - O sistema deve permitir que o usuário faça login com e-mail e senha.
    """
    user = User.objects.create_user(**user_data)
    login_data = {"username": user.username, "password": "senha123"}

    response = api_client.post("/api/token/", login_data, format="json")

    assert response.status_code in [200, 201, 202], \
        f"Esperado 200, mas recebeu {response.status_code}. Certifique-se de que o endpoint de login está configurado."
    assert "access" in response.data or "token" in response.data, \
        "O login deve retornar um token JWT ou de autenticação válido."


@pytest.mark.django_db
def test_lista_usuarios_requer_autenticacao(api_client):
    """
    RF02 - Apenas usuários autenticados devem listar outros usuários.
    """
    response = api_client.get("/api/accounts/users/")
    assert response.status_code in [status.HTTP_403_FORBIDDEN, status.HTTP_401_UNAUTHORIZED]
