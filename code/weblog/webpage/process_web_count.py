import json

load_dict = []

inList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 22, 23, 24, 25, 29, 30, 47, 65, 67, 72]

with open("web_counts.json",'r') as load_f:
    load_dict = json.load(load_f)
    print(len(load_dict))
    print(len(load_dict[0]))
    print(len(load_dict[1]))


new_dict = []
for i in range(len(load_dict)):
    curRow = []
    for j in inList:
        curRow.append(load_dict[i][j])
    new_dict.append(curRow)

with open("web_counts_cropped.json","w") as dump_f:
    json.dump(new_dict,dump_f)