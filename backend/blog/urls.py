from django.urls import path
from .views import PostList, SignupView, login

urlpatterns = [
    path('posts/', PostList.as_view(), name='post-list'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', login, name='login'),
]