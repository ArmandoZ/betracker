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

print(engineeringList)
print(financeList)
print(hrList)

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

# res: [0-1][0-30][0-23][?] = freq
resArray = []
resIn = []
resOut = []
for j in range(31):
    tmpIn = []
    tmpOut = []
    for i in range(24):
        tmpIn.append([0, 0, 0])
        tmpOut.append([0, 0, 0])
    resIn.append(tmpIn)
    resOut.append(tmpOut)
resArray.append(resIn)
resArray.append(resOut)

cwd = os.getcwd()
dirs = os.listdir(cwd + "/../website/data/")
fineNamePaths = []
for dir in dirs:
    if (dir[0] == '2'):
        fineNamePaths.append("../website/data/" + dir + "/checking.csv")

# total = []
# total.append([0, 0, 0])
# total.append([0, 0, 0])
# totalCount = []
# totalCount.append([0, 0, 0])
# totalCount.append([0, 0, 0])


fileIdx = 0
for fileName in fineNamePaths:
    # open file
    fileIdx = int(fileName[27:29]) - 1
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
            resArray[0][fileIdx][inIdx][userType] += 1
        if outIdx != -1:
            resArray[1][fileIdx][outIdx][userType] += 1


# normalize
# for i in range(2):
#     for timeIdx in range(24):
#         for userIdx in range(3):
#             resArray[i][timeIdx][userIdx] = int(resArray[i][timeIdx][userIdx] * 100 / totalCount[i][userIdx]) / 100

# transform
# resJson: list of {time: "00:30", engineering: 111, finance, 1134, hr: 307}
resInJson = []
resOutJson = []

# resInJson.append({"eng_mean": secToStr(total[0][0] / totalCount[0][0]), "finance_mean": secToStr(total[0][1] / totalCount[0][1]), "hr_mean": secToStr(total[0][2] / totalCount[0][2])})
# resOutJson.append({"eng_mean": secToStr(total[1][0] / totalCount[1][0]), "finance_mean": secToStr(total[1][1] / totalCount[1][1]), "hr_mean": secToStr(total[1][2] / totalCount[1][2])})

for j in range(31):
    tmpInJson = []
    tmpOutJson = []
    for i in range(24):
        tmpInJson.append({})
        tmpOutJson.append({})
        tmpInJson[-1]["time"] = idxToStr(i)
        tmpInJson[-1]["engineering"] = resArray[0][j][i][0]
        tmpInJson[-1]["finance"] = resArray[0][j][i][1]
        tmpInJson[-1]["hr"] = resArray[0][j][i][2]
        tmpOutJson[-1]["time"] = idxToStr(i)
        tmpOutJson[-1]["engineering"] = resArray[1][j][i][0]
        tmpOutJson[-1]["finance"] = resArray[1][j][i][1]
        tmpOutJson[-1]["hr"] = resArray[1][j][i][2]
    resInJson.append(tmpInJson)
    resOutJson.append(tmpOutJson)

with open("./output_checkin_days.json", "w") as f:
    json.dump(resInJson, f, indent=4)
with open("./output_checkout_days.json", "w") as f:
    json.dump(resOutJson, f, indent=4)


# TODO website