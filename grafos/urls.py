from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.urls import path

# View
from grafos import views 


urlpatterns = [

    # Posts
    path('', views.home, name='home'),

    path('coloreo/', views.ajax_coloreo, name='ajax_coloreo'),
    path('euler/', views.ajax_euler, name='ajax_euler'),

    path('mis/', views.ajax_mis, name='ajax_mis')
    path('cubierta/', views.ajax_cubierta, name='ajax_cubierta'),

    
    path('hami/', views.ajax_hamilton, name='ajax_hamilton'),

    path('uploadfile/', views.ajax_upload, name='ajax_upload'),

      
]