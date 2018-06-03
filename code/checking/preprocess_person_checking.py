# import
import os
import csv
import json

# engineering = 0
# finance = 1
# hr = 2

engineeringList = []
financeList = []
hrList = []

with open("../../email/staff_grouping.json",'r') as load_f:
    load_dict = json.load(load_f)
    engineeringList.extend(load_dict["engList"])
    engineeringList.extend(load_dict["engLeaderList"])
    financeList.extend(load_dict["financeList"])
    hrList.extend(load_dict["hrList"])

totalList = []
totalList.extend(engineeringList)
totalList.extend(financeList)
totalList.extend(hrList)

# exit()


# ret type, 3 for none
def getType(userId):
    if userId in engineeringList:
        return 0
    if userId in financeList:
        return 1
    if userId in hrList:
        return 2
    return 3

def strToSecs(dateStr):
    dateStr = dateStr[11:]
    hour = int(dateStr[0:2])
    min = int(dateStr[3:5])
    sec = int(dateStr[6:8])
    return (hour, min, sec, hour * 3600 + min * 60 + sec)

def secToStr(sec):
    hourStr = str(int(sec / 3600))
    if len(hourStr) == 1:
        hourStr = '0' + hourStr
    minStr = str(int((sec % 3600) / 60))
    if len(minStr) == 1:
        minStr = '0' + minStr
    secStr = str(int(sec % 60))
    if len(secStr) == 1:
        secStr = '0' + secStr
    return hourStr + ":" + minStr + ":" + secStr 

def idxToStr(idx):
    hourStr = str(idx)
    if len(hourStr) == 1:
        hourStr = "0" + hourStr
    return hourStr + ":30"

# return -1 if illegal
def getDateIndex(dateStr):
    if dateStr == "0":
        return -1
    times = strToSecs(dateStr)
    hur = times[0]
    min = times[1]
    if min >= 30:
        return hur
    else:
        if hur == 0:
            return 23
        else:
            return hur - 1

# res = [{"id": 1222, "type": -1 "checkin": [], "checkout": [], "checkin_avg": 11:22, "checkout_avg": 22:33}, ..]
res = []
for id in totalList:
    tmp = {}
    tmp["id"] = id
    tmp["type"] = -1
    tmp["checkin"] = []
    tmp["checkout"] = []
    tmp["checkin_avg"] = "0"
    tmp["checkout_avg"] = "0"
    for i in range(30):
        tmp["checkin"].append("0")
        tmp["checkout"].append("0")
    res.append(tmp)


cwd = os.getcwd()
dirs = os.listdir(cwd + "/../website/data/")
fineNamePaths = []
for dir in dirs:
    if (dir[0] == '2'):
        fineNamePaths.append("../website/data/" + dir + "/checking.csv")

def indexof(arr, data):
    res = -1
    for dat in arr:
        res += 1
        if dat == data:
            return res

for fileName in fineNamePaths:
    # open file
    dateIdx = int(fileName[27:29]) - 1
    csv_file = csv.reader(open(fileName, 'r'))
    index = 0
    for line in csv_file:
        index += 1
        if index == 1:
            continue
        userId = int(line[0])
        userType = getType(userId)
        if userType == 3:
            continue
        checkin = line[2][11:]
        checkout = line[3][11:]
        if len(checkin) == 0:
            checkin = "0"
        if len(checkout) == 0:
            checkout = "0"
        # fake
        resId = indexof(totalList, userId)
        res[resId]["type"] = userType
        res[resId]["checkin"][dateIdx] = checkin
        res[resId]["checkout"][dateIdx] = checkout
        # append
print(res)
with open("./output_person_checking.json", "w") as f:
    json.dump(res, f, indent=4)