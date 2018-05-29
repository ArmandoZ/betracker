# import
import os
import csv
import json

# engineering = 0
# finance = 1
# hr = 2

engineeringList = [
    1092,
    1087,
    1060,
    1098,
    1100,
    1154,
    1191,
    1207,
    1209
]
financeList = [
    1297, 
    1368,
    1148,
    1126,
    1402,
    1275,
    1311,
    1354,
    1345
]
hrList = [1092, 1096, 1100, 1101]

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

# res: [0-1][0-23][?] = freq
resArray = []
resIn = []
resOut = []
for i in range(24):
    resIn.append([0, 0, 0])
    resOut.append([0, 0, 0])
resArray.append(resIn)
resArray.append(resOut)

cwd = os.getcwd()
dirs = os.listdir(cwd + "/../../website/data/")
fineNamePaths = []
for dir in dirs:
    if (dir[0] == '2'):
        fineNamePaths.append("../../website/data/" + dir + "/checking.csv")

total = []
total.append([0, 0, 0])
total.append([0, 0, 0])
totalCount = []
totalCount.append([0, 0, 0])
totalCount.append([0, 0, 0])

for fileName in fineNamePaths:
    # open file
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
        checkin = line[2]
        checkout = line[3]
        inIdx = getDateIndex(checkin)
        outIdx = getDateIndex(checkout)
        if inIdx != -1:
            resArray[0][inIdx][userType] += 1
            total[0][userType] += strToSecs(checkin)[3]
            totalCount[0][userType] += 1
        if outIdx != -1:
            resArray[1][outIdx][userType] += 1
            total[1][userType] += strToSecs(checkout)[3]
            totalCount[1][userType] += 1

# transform
# resJson: list of {time: "00:30", engineering: 111, finance, 1134, hr: 307}
resInJson = []
resOutJson = []

resInJson.append({"eng_mean": secToStr(total[0][0] / totalCount[0][0]), "finance_mean": secToStr(total[0][1] / totalCount[0][1]), "hr_mean": secToStr(total[0][2] / totalCount[0][2])})
resOutJson.append({"eng_mean": secToStr(total[1][0] / totalCount[1][0]), "finance_mean": secToStr(total[1][1] / totalCount[1][1]), "hr_mean": secToStr(total[1][2] / totalCount[1][2])})

for i in range(24):
    resInJson.append({})
    resOutJson.append({})
    resInJson[-1]["time"] = idxToStr(i)
    resInJson[-1]["engineering"] = resArray[0][i][0]
    resInJson[-1]["finance"] = resArray[0][i][1]
    resInJson[-1]["hr"] = resArray[0][i][2]
    resOutJson[-1]["time"] = idxToStr(i)
    resOutJson[-1]["engineering"] = resArray[1][i][0]
    resOutJson[-1]["finance"] = resArray[1][i][1]
    resOutJson[-1]["hr"] = resArray[1][i][2]

with open("./output_checkin.json", "w") as f:
    json.dump(resInJson, f, indent=4)
with open("./output_checkout.json", "w") as f:
    json.dump(resOutJson, f, indent=4)


# TODO website