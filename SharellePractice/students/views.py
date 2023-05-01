from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Student
from .serializers import *


# Deze method handelt zowel GET als POST operations af van de
# root endpoint van de API.
# Elke keer als er een request wordt gedaan over localhost:8000/api/students
# met GET en POST, wordt deze method uitgevoerd.
@api_view(['GET', 'POST'])
def students_list(request):
    if request.method == 'GET':
        # Als de request method GET is, geef dan alle studenten weer uit de database
        data = Student.objects.all()
        # De GET-resultaten worden doorgegeven naar de serializer.
        # Deze converteert de resultaten naar een Python datatype, voordat de data wordt
        # teruggegeven als response.
        serializer = StudentSerializer(data,
                                       context={'request': request},
                                       many=True
                                       )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(
            data=request.data
        )
        # is_valid() controleert of de data die we ontvangen gelijk is aan
        # de data uit de model/database, anders wordt er een exception gegeven.
        # Maar als alles klopt, dan wordt het opgeslagen in de datastore.
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def students_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StudentSerializer(student,
                                       data=request.data,
                                       context={'request': request},
                                       )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
