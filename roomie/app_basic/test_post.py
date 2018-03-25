import requests, json

base = 'http://localhost:8000/frinet/'
header = {'Content-Type': 'application/json'}
# 'Authorization': 'Token xxxxxx'                                                                                                                                                                                  

def test_register(uname, password, netid):
    payload = {'username': uname, 'password': password, 'netid': netid}
    r = requests.post(base + 'register', data=json.dumps(payload), headers=header)
    return r.status_code

def test_login(uname, passwd):
    payload = {'username': uname, 'password': passwd}
    r = requests.post(base + 'login', data=json.dumps(payload), headers=header)
    return r.json()

def test_logout(auth):
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'logout', headers = header)
    return r.status_code

def test_get_friends(auth):
    header['Authorization'] = 'Token ' + auth
    r = requests.get(base + 'friend', headers = header)
    return r.json()

def test_get_posts(auth):
    header['Authorization'] = 'Token ' + auth
    r = requests.get(base + 'post', headers = header)
    return r.json()

def test_make_post(auth, post_ctnt):
    payload = {'content': post_ctnt}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'make_post', data=json.dumps(payload), headers=header)
    return r.json()

def test_add_following(auth, f_uname):
    payload = {'friend_name': f_uname}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'follow', data=json.dumps(payload), headers=header)
    return r.json()

def test_create_group(auth, uid, group_name):
    payload = {'name': 'Campus Circle', 'price': 635, 'address': '1010W University Ave', 'floorplan': '2B2B', 'occupied': True, 'capacity': 4, 'group_name': group_name, 'uid': uid}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'create_group', data=json.dumps(payload), headers=header)
    return r.json()

def test_add_to_group(auth, gid, uid):
    payload = {'gid': gid, 'uid': uid}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'add_to_group', data=json.dumps(payload), headers=header)
    return r.json()

def test_leave_from_group(auth, gid, uid, refer_uid):
    payload = {'gid': gid, 'uid': uid, 'refer_uid': refer_uid}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'leave_from_group', data=json.dumps(payload), headers=header)
    return r.json()

def test_get_group_info(auth, gid):
    payload = {'gid': gid}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'get_group_info', data=json.dumps(payload), headers=header)
    return r.json()
