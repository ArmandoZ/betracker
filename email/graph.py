import networkx as nx
from networkx.readwrite import json_graph
from pyecharts import Graph
import mysql.connector
# from matplotlib import pyplot as plt
cnx = mysql.connector.connect(user='betracker', password='betracker', host='112.74.54.72', database='betracker',
                              charset='utf8')

cur = cnx.cursor()

cur.execute('select * from email')
g = nx.MultiGraph()
for i in cur:
    if i[6].endswith('hightech.com') and i[7].endswith('hightech.com'):
        g.add_node(i[6])
        g.add_node(i[7])
        g.add_edge(i[6],i[7])
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
eg = Graph('email',width=1500,height=800)
eg.add('people', nodes=g_data['nodes'], links=g_data['links'])
eg.render()
# nx.draw(g,node_size=12)
# plt.show()
