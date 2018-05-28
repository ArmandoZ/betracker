# Email Analysis
## 系统邮箱：
```
select distinct `from` from email where `from` regexp '[^0-9]+@hightech'
work@hightech.com
ti@hightech.net
smail@hightech.com
finance@hightech.com
guanhuai@hightech.com
meeting@hightech.com
hr@hightech.com
school@hightech.com
notice@hightech.com
kaoqin@hightech.com
fuli@hightech.com
allstaff@hightech.com
it@hightech.com
alert@hightech.com
```
### 研发
```
[ALARM...]、 [RECOVER...]
select distinct `to` from email where `from`= 'work@hightech.com'
1092@hightech.com
1087@hightech.com

互联网资产监控报警
select distinct `to` from email where `from`= 'ti@hightech.net'
1060@hightech.com

安全邮件崩溃
select distinct `to` from email where `from`= 'smail@hightech.com'
1060@hightech.com
1098@hightech.com
1100@hightech.com
1154@hightech.com
1191@hightech.com
1207@hightech.com
1209@hightech.com

EmergencyDataBaseFatalError!
select distinct `to` from email where `from`= 'alert@hightech.com'
1284@hightech.com
1487@hightech.com
```

### 财务
```
报销、【通知】各项报销已结算完毕，请通过。
select distinct `to` from email where `from`= 'finance@hightech.com'
1297@hightech.com
1368@hightech.com
1148@hightech.com
1416@hightech.com
1126@hightech.com
1402@hightech.com
1275@hightech.com
1311@hightech.com
1354@hightech.com
1345@hightech.com
1239@hightech.com
1262@hightech.com
1139@hightech.com
1401@hightech.com
1406@hightech.com
1355@hightech.com
1142@hightech.com
1098@hightech.com
1113@hightech.com
1384@hightech.com
1251@hightech.com
1300@hightech.com
1178@hightech.com
1324@hightech.com
1376@hightech.com
1487@hightech.com
1281@hightech.com
1060@hightech.com

资源申请、【通知】设备已归还，请通过。
1301@hightech.com
1438@hightech.com
1381@hightech.com
1253@hightech.com
1223@hightech.com
1315@hightech.com
1273@hightech.com
1324@hightech.com
1263@hightech.com
1385@hightech.com
1486@hightech.com
1388@hightech.com
1480@hightech.com
1279@hightech.com
1251@hightech.com
1257@hightech.com
1487@hightech.com
1141@hightech.com
1376@hightech.com
1281@hightech.com
1194@hightech.com
1148@hightech.com
1460@hightech.com

```

### 人力资源

### Useless now
```
guanhuai@hightech.com
meeting@hightech.com
hr@hightech.com
school@hightech.com
fuli@hightech.com
allstaff@hightech.com

notice@hightech.com
kaoqin@hightech.com


```