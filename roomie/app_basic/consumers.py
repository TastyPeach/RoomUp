import json
from channels import Group
from channels.sessions import channel_session
from .models import Room
from datetime import date, datetime
from django.forms.models import model_to_dict

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

@channel_session
def ws_connect(message):
    print("connected!")
    message.reply_channel.send({"accept": True}) #??
    prefix, label, useless = message['path'].strip('/').split('/')
    room = Room.objects.get(label=label)
    Group('chat-' + label).add(message.reply_channel)
    message.channel_session['room'] = room.label

@channel_session
def ws_receive(message):
    print("called!")
    label = message.channel_session['room']
    room = Room.objects.get(label=label)
    data = json.loads(message['text'])
    m = room.messages.create(handle=data['handle'], message=data['message'])
    m_dick = model_to_dict(m)
    if isinstance(m_dick['timestamp'], (datetime, date)):
        m_dick['timestamp'] = m_dick['timestamp'].strftime('%Y-%m-%d %H:%M') #.isoformat()
    # print( json.dumps(model_to_dict(m), indent=4, sort_keys=True, default=str) )
    print( m_dick )
    Group('chat-'+label).send({'text': json.dumps(m_dick)})

@channel_session
def ws_disconnect(message):
    label = message.channel_session['room']
    Group('chat-'+label).discard(message.reply_channel)
