import os
os.environ.update(DJANGO_SETTINGS_MODULE='roomie.settings')
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
