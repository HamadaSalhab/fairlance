from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import Skill, UserExtra
from .serializers import (
    UserSerializer,
    SkillSerializer,
    UserUpdateSerializer,
    # WalletSerializer,
    UserExtraSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

    def perform_create(self, serializer):
        password = serializer.validated_data["password"]
        serializer.save(password=make_password(password))


class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = "pk"
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class UserExtraUpdateAPIView(generics.UpdateAPIView):
    parser_classes = (FormParser, MultiPartParser)
    queryset = UserExtraSerializer
    serializer_class = UserExtraSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def update(self, request, **kwargs):
        instance = None
        try:
            instance = UserExtra.objects.get(user=request.user)
        except:
            instance = UserExtra.objects.create(user=request.user)

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response(serializer.data)


class SkillListAPIView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class CustomAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "id": token.user.id,
                "first_name": token.user.first_name,
                "last_name": token.user.last_name,
            }
        )


# class WalletRetrieveAPIView(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = WalletSerializer
#     lookup_field = "pk"
#     authentication_classes = [TokenAuthentication, SessionAuthentication]
#     permission_classes = [IsAuthenticated]
