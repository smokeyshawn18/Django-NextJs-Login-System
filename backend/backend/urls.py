from django.contrib import admin
from django.urls import path, include
from blog.views import home  # Import the new view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),
    path('', home, name='home'),  # Root URL
]