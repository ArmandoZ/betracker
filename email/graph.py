import networkx as nx
from networkx.readwrite import json_graph
from pyecharts import Graph
import mysql.connector

# from matplotlib import pyplot as plt
cnx = mysql.connector.connect(user='betracker', password='betracker', host='112.74.54.72', database='betracker',
                              charset='utf8')

cur = cnx.cursor()

cur.execute('select * from `user`')

# known_users = cur.fetchall()
known_users = {}
for i in cur:
    known_users[i[0]] = [i[1],i[2]]

cur.execute('select * from email')
g = nx.MultiGraph()

system_email = [
    'work@hightech.com',
    'smail@hightech.com',
    'finance@hightech.com',
    'guanhuai@hightech.com',
    'meeting@hightech.com',
    'school@hightech.com',
    'notice@hightech.com',
    'kaoqin@hightech.com',
    'fuli@hightech.com',
    'allstaff@hightech.com',
    'alert@hightech.com',
    'hr@hightech.com',
    'it@hightech.com'

]
for i in cur:
    if i[6].endswith('hightech.com') and i[7].endswith('hightech.com') and i[6] not in system_email and i[7] not in system_email:
        from_id = i[6].split('@')[0]
        from_kind = 0
        from_size = 10
        to_size = 10
        to_id = i[7].split('@')[0]
        to_kind = 0
        if from_id in known_users:
            from_kind = known_users[from_id][0]
            from_size = known_users[from_id][1]
        if to_id in known_users:
            to_kind = known_users[to_id][0]
            to_size = known_users[to_id][1]
        g.add_node(from_id, name=i[6].split('@')[0], category=from_kind,symbolSize=from_size)
        g.add_node(to_id, name=i[7].split('@')[0], category=to_kind,symbolSize=to_size)
        g.add_edge(from_id, to_id)
    # g.add_node(i[6])
    # g.has_node(i[7])

# g = nx.Graph()
# g.add_node('G1', name='Gateway 1')
# g.add_node('N2', name='Node 2')
# g.add_node('N2', name='Node 3')
# g.add_edge('G1', 'N2')
# g.add_edge('G1', 'N3')
g_data = json_graph.node_link_data(g)
# print(g_data)
eg = Graph('email', width=1500, height=800)
eg.add('people', nodes=g_data['nodes'], links=g_data['links'], categories=[{'name':'0'},{'name':'1'},{'name':'2'},{'name':'3'},{'name':'4'}])
eg.render()
# nx.draw(g,node_size=12)
# plt.show()
