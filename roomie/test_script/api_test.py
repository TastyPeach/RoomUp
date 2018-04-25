import requests, json

base = 'http://localhost:8001/'
header = {'Content-Type': 'application/json'}
# 'Authorization': 'Token xxxxxx'

def test_register(uname, password, fname, lname, email):
    payload = {'username': uname, 'password': password, 'first_name': fname, \
               'last_name': lname, 'email': email}
    r = requests.post(base + 'register', data=json.dumps(payload), headers=header)
    return r

def test_login(uname, passwd):
    payload = {'username': uname, 'password': passwd}
    r = requests.post(base + 'login', data=json.dumps(payload), headers=header)
    return r

def test_logout(auth):
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'logout', headers = header)
    return r

def test_get_apt_by_name():
    pass

def test_get_apt_by_id(auth, aid):
    header['Authorization'] = 'Token ' + auth
    r = requests.get(base + 'get_apt_by_id?aid=' + aid, headers=header)
    return r

def test_become_advance(auth,ge=None,a=None,e=None,q=None,s=None,t=None,p=None,m=None,h=None,\
                        l=None,gr=None,n=None):
    header['Authorization'] = 'Token ' + auth
    payload = {'gender': ge, 'age': a, 'ethinicity': e, 'quietness': q, 'sanitary': s, \
               'timetobed': t, 'pet': p, 'major': m, 'hobbies': h, 'language': l, \
               'graduationyear': gr, 'note': n}
    r = requests.post(base + 'become_advance', data=json.dumps(payload), headers=header)
    return r

def test_get_personal_info(auth):
    header['Authorization'] = 'Token ' + auth
    r = requests.get(base + 'get_personal_info', headers=header)
    return r

def test_get_user_info(auth, uname):
    header['Authorization'] = 'Token ' + auth
    payload = {'username': uname}
    r = requests.get(base + 'get_user_info', data=json.dumps(payload), headers=header)
    return r

def test_add_potential_match(auth, gid):
    header['Authorization'] = 'Token ' + auth
    payload = {'gid': gid}
    r = requests.post(base + 'add_potential_match', data=json.dumps(payload), headers=header)
    return r

def test_get_potential_match(auth):
    header['Authorization'] = 'Token ' + auth
    r = requests.get(base + 'get_potential_match', headers=header)
    return r

def test_delete_potential_match(auth, pid):
    header['Authorization'] = 'Token ' + auth
    payload = {'pid': pid}
    r = requests.delete(base + 'delete_potential_match', data=json.dumps(payload), headers=header)
    return r

def test_keyword_search(keyword):

    r = requests.get(base + 'keyword_search?keyword=' + keyword, headers=header)
    return r
# ----------------------- group -------------------------
def test_create_group(auth, group_name):
    payload = {'name': 'Campus Circle', 'price': 635, 'address': '1010W University Ave', 'floorplan': '2B2B', 'occupied': True, 'capacity': 4, 'group_name': group_name}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'create_group', data=json.dumps(payload), headers=header)
    return r

def test_add_to_group(auth, gid):
    payload = {'gid': gid}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'add_to_group', data=json.dumps(payload), headers=header)
    return r

def test_leave_from_group(auth, gid, refer_uid):
    payload = {'gid': gid, 'refer_uid': refer_uid}
    header['Authorization'] = 'Token ' + auth
    r = requests.post(base + 'leave_from_group', data=json.dumps(payload), headers=header)
    return r

if __name__ == "__main__":
    pass
