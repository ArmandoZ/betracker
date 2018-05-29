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
Some problem
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
select distinct `to` from email where `from`= 'it@hightech.com'
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
```
个人资料、照片、表格等资料
SELECT distinct `to` FROM betracker.email where subject regexp '资料'
1378@hightech.com
1110@hightech.com
1499@hightech.com
1184@hightech.com
1433@hightech.com
1371@hightech.com
1149@hightech.com
1363@hightech.com
1251@hightech.com
1312@hightech.com
1104@hightech.com
1249@hightech.com
1300@hightech.com
1118@hightech.com
1165@hightech.com
1473@hightech.com
1295@hightech.com
1013@hightech.com

简历、个人简历
SELECT distinct `to` FROM betracker.email where subject = '简历' or subject = '个人简历'
1149@hightech.com
1433@hightech.com
1013@hightech.com
1184@hightech.com
1363@hightech.com
1312@hightech.com
1371@hightech.com
1295@hightech.com
1300@hightech.com
1378@hightech.com
1104@hightech.com
1499@hightech.com
1165@hightech.com
1251@hightech.com
1118@hightech.com
1110@hightech.com
1249@hightech.com
1473@hightech.com

以上为人力资源部一线人员

select distinct `to` from email where `subject` regexp '计划|目标' and left(`from`,length(`from`)-13) in (select user_id from `user` where kind=3)
1104@hightech.com
1499@hightech.com
1371@hightech.com
1184@hightech.com
1251@hightech.com
1295@hightech.com
1312@hightech.com
1433@hightech.com
1165@hightech.com
1300@hightech.com
1378@hightech.com
1473@hightech.com
1118@hightech.com
1363@hightech.com
1249@hightech.com
1110@hightech.com
1149@hightech.com

select distinct `to` from email where `from`='1013@hightech.com'and `subject` regexp '汇报'

可以看出，18个一线成员的leader是1013，1013直接上司是1067，有17个直接下属

select distinct `from` from email where `to` ='1067@hightech.com' and `subject` regexp '汇报'
1041@hightech.com
1007@hightech.com
1068@hightech.com
1013@hightech.com
1059@hightech.com

1067有5个直接下属1041，1007，1068，1013，1059

SELECT distinct `to` FROM betracker.email where `from` = '1041@hightech.com' and subject regexp '目标|计划'
1368@hightech.com
1347@hightech.com
1255@hightech.com
1248@hightech.com
1327@hightech.com
1439@hightech.com
1137@hightech.com
1370@hightech.com
1467@hightech.com
1226@hightech.com
1369@hightech.com
1186@hightech.com
1213@hightech.com
1451@hightech.com
1124@hightech.com
1431@hightech.com
1293@hightech.com
1253@hightech.com
1342@hightech.com
1498@hightech.com
1108@hightech.com
1180@hightech.com
1346@hightech.com

1041有23个直接下属，只向1067汇报，此外：
SELECT * FROM betracker.email where `from` = '1041@hightech.com' and `subject` regexp '财务'
2017-11-05 15:32:11	smtp	10.64.105.89	2419	10.5.71.60	25	1041@hightech.com	5c51b5ba6c3700749bbc16c88c385c7e@sina.com	财务
2017-11-14 15:24:02	smtp	10.64.105.89	2977	10.5.71.60	25	1041@hightech.com	5166c81f916c89b6a97e57cf03af3ceb@sina.com	财务
2017-11-16 12:03:03	smtp	10.64.105.89	2209	10.5.71.60	25	1041@hightech.com	42adb5f0c95c45bb3c842062bb17c5f5@sohu.com	财务
2017-11-17 11:55:26	smtp	10.64.105.89	2579	10.5.71.60	25	1041@hightech.com	fb2b6ad8ed2be6c0d2ea92b592e4aaa3@qq.com	财务
2017-11-22 16:06:17	smtp	10.64.105.89	2872	10.5.71.60	25	1041@hightech.com	6b87e244b68bf80f10a079ef569b61de@qq.com	财务
2017-11-23 17:49:47	smtp	10.64.105.89	2645	10.5.71.60	25	1041@hightech.com	eff01fc265b817170c032efe64178ff8@foxmail.com	财务
2017-11-26 09:42:54	smtp	10.64.105.89	2364	10.5.71.60	25	1041@hightech.com	de3b0a7d917c3c836cb7700cba7338df@qq.com	财务
（猜测某种Alarm？

SELECT * FROM betracker.email where `to` = '1041@hightech.com'

可知1041属于财务部门
SELECT distinct `from` FROM betracker.email where `to` = '1041@hightech.com' and `from` regexp '@hightech.com'
再次证明104123个下属和一个直接上司

1007 研发部，9个直接下属和一个辞职下属
select distinct `to` from email where `from` ='1007@hightech.com' and subject regexp '例会'
1087@hightech.com
1115@hightech.com
1230@hightech.com
1172@hightech.com
1192@hightech.com
1199@hightech.com
1092@hightech.com
1125@hightech.com
1224@hightech.com

select distinct `to` from email where `from` ='1007@hightech.com' and subject regexp '辞职'
1281@hightech.com

1068研发部，7个直接下属
select distinct `to` from email where `from` ='1068@hightech.com' and subject regexp '例会'
1154@hightech.com
1191@hightech.com
1207@hightech.com
1100@hightech.com
1098@hightech.com
1209@hightech.com
1060@hightech.com

1059研发部，11个直接下属，2个离职下属
select distinct `to` from email where `from` ='1059@hightech.com' and subject regexp '例会'
1080@hightech.com
1211@hightech.com
1101@hightech.com
1143@hightech.com
1119@hightech.com
1155@hightech.com
1058@hightech.com
1228@hightech.com
1096@hightech.com
1079@hightech.com
1057@hightech.com
select distinct `to` from email where `from` ='1059@hightech.com' and subject regexp '辞职'
1376@hightech.com
1487@hightech.com
```
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