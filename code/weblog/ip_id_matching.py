import pandas as pd
import numpy as np
import codecs
import json

df = pd.DataFrame()

for i in range(1, 31):
    f = codecs.open('.\\chinavis2018挑战一数据\\2017-11-'+ '%02d'%i+'\\email.csv', mode='r',
                    encoding='utf-8', errors='ignore')
    tmp = pd.read_csv(f, header=0)
    print(tmp.shape)
    df = df.append(tmp, ignore_index=True)

id_filter = np.zeros(len(df), dtype=np.bool)
for i in range(len(df)):
    id_filter[i] = df['from'][i][4] == '@' and df['from'][i][0] == '1'
df = df[id_filter]
df = df.reset_index(drop=True)
print(df.keys())

source_ids = df['from'].unique()
# source_ids = source_ids[id_filter]
source_ips = df['sip'].unique()

ip_to_id = {}
for i in range(len(df)):
    ip_to_id[df['sip'][i]] = df['from'][i][:4]
print(ip_to_id)
print(len(ip_to_id))

json.dump(ip_to_id, open('ip_to_id_dict.json', 'w'))
np.mean()
np.std()


print(source_ids.shape, source_ips.shape)