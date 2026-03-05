from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Todo


class TestTodoAPI(APITestCase):
    def test_create_and_list_todo(self):
        create_response = self.client.post(
            reverse("todo-list"),
            {"text": "Write backend", "completed": False},
            format="json",
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(create_response.data["text"], "Write backend")
        self.assertFalse(create_response.data["completed"])

        list_response = self.client.get(reverse("todo-list"))
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_response.data), 1)

    def test_update_todo(self):
        todo = Todo.objects.create(text="Old text")
        update_response = self.client.patch(
            reverse("todo-detail", args=[todo.id]),
            {"text": "Updated text", "completed": True},
            format="json",
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data["text"], "Updated text")
        self.assertTrue(update_response.data["completed"])

    def test_delete_todo(self):
        todo = Todo.objects.create(text="Delete me")
        delete_response = self.client.delete(reverse("todo-detail", args=[todo.id]))
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Todo.objects.filter(id=todo.id).exists())
