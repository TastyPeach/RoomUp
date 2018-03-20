import requests, json

base = 'http://localhost:8001/'
header = {'Content-Type': 'application/json'}
# 'Authorization': 'Token xxxxxx'

def test_register(uname, password):
    payload = {'username': uname, 'password': password}
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
                                    
if __name__ == "__main__":
    pass
