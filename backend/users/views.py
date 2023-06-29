from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializers import FreelancersSerializer

@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    user = serializer.validated_data['user']
    created, token = AuthToken.objects.create(user)
    assert created

    return Response({
        'user_info':{
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first name' : user.first_name,
            'last name' : user.last_name
        },
        'token': token
    })


@api_view(['POST'])
def register_freelancer_api(request):
    serializer = FreelancersSerializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    freelancer = serializer.save()
    user = freelancer.freelancer.user
    created, token = AuthToken.objects.create(user)
    assert created  
    return Response({
        'user_info':{
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first name' : user.first_name,
            'last name' : user.last_name
        },
        'token': token
    })