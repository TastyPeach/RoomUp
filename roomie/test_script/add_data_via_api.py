from api_test import *
import time
"""
u = 0 # user counter
ge = 0 # 0-2
q = 0 # 0-4
s = 0 # 0-4
t = 0 # 0-4
p = 0 # 0/1
"""
all_comb = []
def gen_comb():
    for ge in range(1,3):
        for q in range(5):
            for s in range(5):
                for t in range(5):
                    for p  in range(2):
                        all_comb.append([ge,q,s,t,p])
                        
def add_data():
    u = 257
    for i in range(len(all_comb)):
        test_register('test'+str(u), 'test'+str(u), 'Test'+str(u), 'User', 'ts'+str(u)+'@test.com')
        r = test_login('test'+str(u), 'test'+str(u))
        token = r.json()['token']
        test_become_advance(token, ge=all_comb[i][0], q=all_comb[i][1], s=all_comb[i][2],\
                            t=all_comb[i][3], p=all_comb[i][4])
        test_create_group(token, 'test'+str(u))
        u += 1
        time.sleep(0.5)

gen_comb()
# for ac in all_comb:
#     print(ac)

add_data()
        
        
