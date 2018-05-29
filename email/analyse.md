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
2017-11-01 09:26:18	smtp	10.64.105.235	2527	10.5.71.60	25	1498@hightech.com	1041@hightech.com	税务
2017-11-01 09:45:29	smtp	10.64.105.83	1748	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-01 09:50:10	smtp	10.64.105.198	1620	10.5.71.60	25	1467@hightech.com	1041@hightech.com	资金
2017-11-01 09:58:09	smtp	10.64.105.81	2293	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-01 09:59:04	smtp	10.64.105.243	2389	10.5.71.60	25	1369@hightech.com	1041@hightech.com	财务分析
2017-11-01 10:06:00	smtp	10.64.105.43	1735	10.5.71.60	25	1124@hightech.com	1041@hightech.com	资金
2017-11-01 10:19:18	smtp	10.64.105.235	2543	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-01 10:23:21	smtp	10.64.105.12	2211	10.5.71.60	25	1342@hightech.com	1041@hightech.com	会计核算
2017-11-01 10:37:30	smtp	10.64.105.81	2276	10.5.71.60	25	1327@hightech.com	1041@hightech.com	资金
2017-11-01 10:41:16	smtp	10.64.105.215	1979	10.5.71.60	25	1346@hightech.com	1041@hightech.com	财务分析
2017-11-01 10:45:09	smtp	10.64.105.215	1967	10.5.71.60	25	1346@hightech.com	1041@hightech.com	税务
2017-11-01 10:47:38	smtp	10.64.105.15	1927	10.5.71.60	25	1253@hightech.com	1041@hightech.com	成本控制
2017-11-01 10:51:59	smtp	10.64.105.90	1581	10.5.71.60	25	1226@hightech.com	1041@hightech.com	税务
2017-11-01 10:55:10	smtp	10.64.105.243	2386	10.5.71.60	25	1369@hightech.com	1041@hightech.com	税务
2017-11-01 11:27:16	smtp	10.64.105.8	1686	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-01 11:30:35	smtp	10.64.105.235	2553	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-01 11:45:13	smtp	10.64.105.205	1969	10.5.71.60	25	1255@hightech.com	1041@hightech.com	工作汇报
2017-11-01 11:58:45	smtp	10.64.105.15	1913	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-01 11:59:10	smtp	10.64.105.198	1616	10.5.71.60	25	1467@hightech.com	1041@hightech.com	财务分析
2017-11-01 14:27:39	smtp	10.64.105.88	3070	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-01 14:38:51	smtp	10.64.105.83	2241	10.5.71.60	25	1431@hightech.com	1041@hightech.com	会计核算
2017-11-01 15:41:40	smtp	10.64.106.30	2921	10.5.71.60	25	1137@hightech.com	1041@hightech.com	财务分析
2017-11-01 16:06:49	smtp	10.64.105.243	3119	10.5.71.60	25	1369@hightech.com	1041@hightech.com	税务
2017-11-01 16:07:30	smtp	10.64.105.243	3114	10.5.71.60	25	1369@hightech.com	1041@hightech.com	会计核算
2017-11-01 16:27:29	smtp	10.64.105.12	3006	10.5.71.60	25	1342@hightech.com	1041@hightech.com	会计核算
2017-11-01 17:09:34	smtp	10.64.105.235	3605	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-01 17:18:38	smtp	10.64.105.215	2663	10.5.71.60	25	1346@hightech.com	1041@hightech.com	会计核算
2017-11-01 17:25:36	smtp	10.64.105.90	2306	10.5.71.60	25	1226@hightech.com	1041@hightech.com	成本控制
2017-11-01 18:54:52	smtp	10.64.106.23	2879	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-01 18:57:56	smtp	10.64.105.12	3021	10.5.71.60	25	1342@hightech.com	1041@hightech.com	工作汇报
2017-11-02 03:00:00	smtp	10.1.4.17	49230	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-02 09:27:05	smtp	10.64.105.81	2653	10.5.71.60	25	1327@hightech.com	1041@hightech.com	资金
2017-11-02 09:30:09	smtp	10.64.106.16	2146	10.5.71.60	25	1347@hightech.com	1041@hightech.com	会计核算
2017-11-02 09:38:13	smtp	10.64.106.30	2604	10.5.71.60	25	1137@hightech.com	1041@hightech.com	会计核算
2017-11-02 09:38:43	smtp	10.64.105.231	1578	10.5.71.60	25	1213@hightech.com	1041@hightech.com	工作汇报
2017-11-02 09:40:02	smtp	10.64.105.198	2008	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-02 09:57:39	smtp	10.64.105.205	1889	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-02 09:58:54	smtp	10.64.106.16	2173	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-02 10:13:31	smtp	10.64.105.81	2646	10.5.71.60	25	1327@hightech.com	1041@hightech.com	资金
2017-11-02 10:35:10	smtp	10.64.105.231	1573	10.5.71.60	25	1213@hightech.com	1041@hightech.com	会计核算
2017-11-02 10:46:54	smtp	10.64.105.90	2598	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-02 10:49:06	smtp	10.64.105.225	2181	10.5.71.60	25	1370@hightech.com	1041@hightech.com	成本控制
2017-11-02 11:10:38	smtp	10.64.105.215	2670	10.5.71.60	25	1346@hightech.com	1041@hightech.com	工作汇报
2017-11-02 11:31:14	smtp	10.64.105.43	2208	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-02 11:45:39	smtp	10.64.106.23	2615	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-02 13:58:33	smtp	10.64.105.88	2604	10.5.71.60	25	1368@hightech.com	1041@hightech.com	资金
2017-11-02 14:00:50	smtp	10.64.105.248	3368	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-02 14:17:34	smtp	10.64.105.83	2641	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-02 14:23:37	smtp	10.64.105.122	3006	10.5.71.60	25	1186@hightech.com	1041@hightech.com	资金
2017-11-02 14:49:03	smtp	10.64.105.81	3306	10.5.71.60	25	1327@hightech.com	1041@hightech.com	成本控制
2017-11-02 15:06:49	smtp	10.64.105.81	3309	10.5.71.60	25	1327@hightech.com	1041@hightech.com	会计核算
2017-11-02 15:27:21	smtp	10.64.105.198	3129	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-02 15:36:20	smtp	10.64.105.248	3373	10.5.71.60	25	1293@hightech.com	1041@hightech.com	成本控制
2017-11-02 15:43:54	smtp	10.64.105.81	3338	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-02 16:18:36	smtp	10.64.105.29	2770	10.5.71.60	25	1451@hightech.com	1041@hightech.com	会计核算
2017-11-02 16:24:55	smtp	10.64.105.83	2647	10.5.71.60	25	1431@hightech.com	1041@hightech.com	工作汇报
2017-11-02 16:52:55	smtp	10.64.105.88	2597	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-02 16:56:20	smtp	10.64.105.29	2752	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-02 16:59:15	smtp	10.64.105.8	2784	10.5.71.60	25	1108@hightech.com	1041@hightech.com	财务分析
2017-11-02 17:13:02	smtp	14.17.32.47	3373	10.5.71.60	25	19bfb829b47ea24632b1637021e6aaf8@foxmail.com	1041@hightech.com	财务
2017-11-02 17:45:37	smtp	10.64.106.16	2600	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-03 04:00:00	smtp	10.1.4.17	49233	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-03 09:27:21	smtp	10.64.105.248	2132	10.5.71.60	25	1293@hightech.com	1041@hightech.com	税务
2017-11-03 09:40:08	smtp	10.64.105.83	2430	10.5.71.60	25	1431@hightech.com	1041@hightech.com	工作汇报
2017-11-03 09:50:57	smtp	10.64.105.15	1839	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-03 10:29:23	smtp	219.142.78.230	1681	10.5.71.60	25	64d72269a2b07eed291d211a5eb44fb0@sina.com	1041@hightech.com	财务
2017-11-03 10:35:09	smtp	10.64.106.16	1801	10.5.71.60	25	1347@hightech.com	1041@hightech.com	税务
2017-11-03 10:44:15	smtp	10.64.106.23	2157	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-03 10:52:34	smtp	10.64.105.90	2304	10.5.71.60	25	1226@hightech.com	1041@hightech.com	成本控制
2017-11-03 11:02:48	smtp	10.64.105.22	2305	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-03 11:07:36	smtp	10.64.105.83	2430	10.5.71.60	25	1431@hightech.com	1041@hightech.com	税务
2017-11-03 11:07:50	smtp	10.64.105.248	2123	10.5.71.60	25	1293@hightech.com	1041@hightech.com	会计核算
2017-11-03 11:12:07	smtp	10.64.105.71	1698	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-03 11:34:09	smtp	10.64.105.90	2331	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-03 11:40:11	smtp	10.64.105.248	2124	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-03 11:48:13	smtp	10.64.105.88	2046	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-03 11:50:23	smtp	10.64.105.12	1799	10.5.71.60	25	1342@hightech.com	1041@hightech.com	工作汇报
2017-11-03 11:55:34	smtp	10.64.105.22	2316	10.5.71.60	25	1439@hightech.com	1041@hightech.com	会计核算
2017-11-03 11:57:15	smtp	10.64.105.8	2207	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-03 12:11:03	smtp	10.64.105.22	2320	10.5.71.60	25	1439@hightech.com	1041@hightech.com	工作汇报
2017-11-03 12:27:16	smtp	10.64.105.248	2124	10.5.71.60	25	1293@hightech.com	1041@hightech.com	成本控制
2017-11-03 14:01:15	smtp	10.64.105.8	2776	10.5.71.60	25	1108@hightech.com	1041@hightech.com	税务
2017-11-03 14:21:41	smtp	10.64.105.243	2983	10.5.71.60	25	1369@hightech.com	1041@hightech.com	会计核算
2017-11-03 14:56:53	smtp	10.64.106.30	2764	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-03 15:27:08	smtp	10.64.105.83	3077	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-03 15:27:49	smtp	10.64.105.83	3083	10.5.71.60	25	1431@hightech.com	1041@hightech.com	税务
2017-11-03 15:28:04	smtp	10.64.105.90	3035	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-03 15:30:06	smtp	10.64.105.215	2984	10.5.71.60	25	1346@hightech.com	1041@hightech.com	会计核算
2017-11-03 16:21:23	smtp	10.64.105.43	2605	10.5.71.60	25	1124@hightech.com	1041@hightech.com	税务
2017-11-03 16:31:09	smtp	10.64.105.243	2987	10.5.71.60	25	1369@hightech.com	1041@hightech.com	税务
2017-11-03 16:46:18	smtp	10.64.106.16	2467	10.5.71.60	25	1347@hightech.com	1041@hightech.com	成本控制
2017-11-03 17:33:54	smtp	10.64.106.16	2461	10.5.71.60	25	1347@hightech.com	1041@hightech.com	成本控制
2017-11-03 18:01:09	smtp	10.64.105.198	2574	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-04 03:00:00	smtp	10.1.4.17	49187	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-05 16:08:59	smtp	111.202.126.72	3251	10.5.71.60	25	8006e4393505e2f3d151f62a0c76cfb7@sohu.com	1041@hightech.com	财务
2017-11-06 09:45:28	smtp	10.64.105.81	2574	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-06 09:45:35	smtp	10.64.105.88	2431	10.5.71.60	25	1368@hightech.com	1041@hightech.com	税务
2017-11-06 09:49:42	smtp	10.64.105.243	1777	10.5.71.60	25	1369@hightech.com	1041@hightech.com	财务分析
2017-11-06 10:11:45	smtp	10.64.105.8	1591	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-06 10:42:30	smtp	10.64.105.235	2318	10.5.71.60	25	1498@hightech.com	1041@hightech.com	资金
2017-11-06 10:56:54	smtp	10.64.105.8	1601	10.5.71.60	25	1108@hightech.com	1041@hightech.com	税务
2017-11-06 10:57:44	smtp	10.64.105.12	2252	10.5.71.60	25	1342@hightech.com	1041@hightech.com	资金
2017-11-06 11:23:19	smtp	10.64.105.205	2182	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-06 11:39:39	smtp	10.64.105.198	1938	10.5.71.60	25	1467@hightech.com	1041@hightech.com	会计核算
2017-11-06 11:45:03	smtp	10.64.105.29	2379	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-06 12:07:22	smtp	10.64.105.90	1739	10.5.71.60	25	1226@hightech.com	1041@hightech.com	成本控制
2017-11-06 12:13:00	smtp	10.64.105.81	2565	10.5.71.60	25	1327@hightech.com	1041@hightech.com	财务分析
2017-11-06 13:44:28	smtp	10.64.105.71	3156	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-06 13:52:45	smtp	10.64.105.22	2612	10.5.71.60	25	1439@hightech.com	1041@hightech.com	成本控制
2017-11-06 15:32:23	smtp	10.64.106.16	3448	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-06 15:41:34	smtp	10.64.105.205	2834	10.5.71.60	25	1255@hightech.com	1041@hightech.com	财务分析
2017-11-06 15:56:41	smtp	10.64.105.248	3206	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-06 16:34:10	smtp	10.64.105.43	3094	10.5.71.60	25	1124@hightech.com	1041@hightech.com	税务
2017-11-06 16:43:48	smtp	10.64.105.29	3139	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-06 16:46:46	smtp	10.64.105.198	2637	10.5.71.60	25	1467@hightech.com	1041@hightech.com	税务
2017-11-06 16:53:29	smtp	10.64.105.88	3439	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-06 17:02:33	smtp	10.64.105.15	2953	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-06 17:37:23	smtp	10.64.105.122	2568	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-06 18:40:12	smtp	10.64.105.243	2790	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-07 03:00:00	smtp	10.1.4.17	49223	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-07 09:24:57	smtp	10.64.105.12	1970	10.5.71.60	25	1342@hightech.com	1041@hightech.com	税务
2017-11-07 09:42:12	smtp	10.64.105.15	2443	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-07 09:45:34	smtp	10.64.105.8	2349	10.5.71.60	25	1108@hightech.com	1041@hightech.com	资金
2017-11-07 09:46:14	smtp	10.64.105.88	2252	10.5.71.60	25	1368@hightech.com	1041@hightech.com	税务
2017-11-07 09:49:25	smtp	10.64.105.90	1786	10.5.71.60	25	1226@hightech.com	1041@hightech.com	会计核算
2017-11-07 09:51:09	smtp	10.64.105.205	1806	10.5.71.60	25	1255@hightech.com	1041@hightech.com	税务
2017-11-07 09:58:27	smtp	10.64.105.8	2352	10.5.71.60	25	1108@hightech.com	1041@hightech.com	资金
2017-11-07 10:14:29	smtp	10.64.106.30	2498	10.5.71.60	25	1137@hightech.com	1041@hightech.com	财务分析
2017-11-07 10:21:50	smtp	10.64.105.12	1990	10.5.71.60	25	1342@hightech.com	1041@hightech.com	资金
2017-11-07 10:25:55	smtp	10.64.106.30	2488	10.5.71.60	25	1137@hightech.com	1041@hightech.com	财务分析
2017-11-07 10:39:43	smtp	10.64.105.81	2389	10.5.71.60	25	1327@hightech.com	1041@hightech.com	资金
2017-11-07 10:49:50	smtp	10.64.105.235	2049	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-07 11:00:54	smtp	10.64.105.205	1813	10.5.71.60	25	1255@hightech.com	1041@hightech.com	资金
2017-11-07 11:13:40	smtp	10.64.105.15	2456	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-07 11:40:49	smtp	10.64.105.22	2314	10.5.71.60	25	1439@hightech.com	1041@hightech.com	工作汇报
2017-11-07 11:48:27	smtp	10.64.105.15	2470	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-07 13:53:54	smtp	10.64.105.231	3223	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-07 14:50:55	smtp	10.64.105.22	3260	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-07 14:53:21	smtp	10.64.105.15	2717	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-07 14:55:44	smtp	10.64.105.198	3006	10.5.71.60	25	1467@hightech.com	1041@hightech.com	会计核算
2017-11-07 15:04:14	smtp	10.64.105.248	2286	10.5.71.60	25	1293@hightech.com	1041@hightech.com	会计核算
2017-11-07 15:41:03	smtp	10.64.105.81	2892	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-07 16:06:05	smtp	10.64.105.71	3219	10.5.71.60	25	1180@hightech.com	1041@hightech.com	成本控制
2017-11-07 16:12:32	smtp	10.64.105.205	2375	10.5.71.60	25	1255@hightech.com	1041@hightech.com	财务分析
2017-11-07 16:15:11	smtp	10.64.105.15	2739	10.5.71.60	25	1253@hightech.com	1041@hightech.com	税务
2017-11-07 17:10:07	smtp	10.64.105.88	2936	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-07 17:24:45	smtp	10.64.105.22	3264	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-07 17:25:48	smtp	10.64.105.8	2998	10.5.71.60	25	1108@hightech.com	1041@hightech.com	税务
2017-11-08 09:24:43	smtp	10.64.105.29	1957	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-08 09:29:18	smtp	10.64.105.198	2127	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-08 09:33:33	smtp	10.64.105.122	2319	10.5.71.60	25	1186@hightech.com	1041@hightech.com	成本控制
2017-11-08 09:34:48	smtp	10.64.105.235	1651	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-08 09:44:34	smtp	10.64.106.23	1745	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-08 09:46:53	smtp	10.64.105.90	1719	10.5.71.60	25	1226@hightech.com	1041@hightech.com	成本控制
2017-11-08 09:47:41	smtp	10.64.106.16	1687	10.5.71.60	25	1347@hightech.com	1041@hightech.com	工作汇报
2017-11-08 10:43:53	smtp	10.64.105.43	2001	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-08 10:59:48	smtp	10.64.105.90	1718	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-08 11:01:37	smtp	10.64.105.71	1870	10.5.71.60	25	1180@hightech.com	1041@hightech.com	会计核算
2017-11-08 11:07:43	smtp	10.64.105.43	2002	10.5.71.60	25	1124@hightech.com	1041@hightech.com	财务分析
2017-11-08 11:25:57	smtp	10.64.105.122	2318	10.5.71.60	25	1186@hightech.com	1041@hightech.com	税务
2017-11-08 11:26:46	smtp	10.64.105.90	1712	10.5.71.60	25	1226@hightech.com	1041@hightech.com	会计核算
2017-11-08 11:32:05	smtp	10.64.105.243	1622	10.5.71.60	25	1369@hightech.com	1041@hightech.com	成本控制
2017-11-08 11:34:01	smtp	10.64.105.81	2275	10.5.71.60	25	1327@hightech.com	1041@hightech.com	财务分析
2017-11-08 11:37:53	smtp	10.64.105.215	2613	10.5.71.60	25	1346@hightech.com	1041@hightech.com	资金
2017-11-08 11:42:26	smtp	10.64.105.205	1880	10.5.71.60	25	1255@hightech.com	1041@hightech.com	工作汇报
2017-11-08 11:46:08	smtp	10.64.105.198	2152	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-08 11:50:47	smtp	10.64.105.29	1951	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-08 11:52:18	smtp	10.64.105.88	2594	10.5.71.60	25	1368@hightech.com	1041@hightech.com	税务
2017-11-08 11:53:22	smtp	10.64.105.243	1620	10.5.71.60	25	1369@hightech.com	1041@hightech.com	成本控制
2017-11-08 12:01:46	smtp	10.64.106.23	1754	10.5.71.60	25	1248@hightech.com	1041@hightech.com	工作汇报
2017-11-08 12:21:25	smtp	10.64.105.15	1956	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-08 12:23:27	smtp	10.64.105.8	2074	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-08 14:43:12	smtp	10.64.105.231	3129	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-08 15:07:14	smtp	10.64.105.83	3110	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-08 15:25:16	smtp	10.64.105.29	2513	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-08 15:30:34	smtp	10.64.105.8	2712	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-08 15:42:04	smtp	10.64.105.29	2530	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-08 15:50:07	smtp	111.202.126.72	1954	10.5.71.60	25	e857d595a51a7da9b78e6d48e2fb9549@sohu.com	1041@hightech.com	财务
2017-11-08 16:07:01	smtp	10.64.105.243	2229	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-08 16:13:34	smtp	10.64.105.198	3102	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-08 16:20:23	smtp	10.64.106.30	2767	10.5.71.60	25	1137@hightech.com	1041@hightech.com	财务分析
2017-11-08 16:30:21	smtp	10.64.105.8	2700	10.5.71.60	25	1108@hightech.com	1041@hightech.com	财务分析
2017-11-08 16:52:35	smtp	10.64.105.88	3295	10.5.71.60	25	1368@hightech.com	1041@hightech.com	工作汇报
2017-11-08 17:23:24	smtp	10.64.105.22	3355	10.5.71.60	25	1439@hightech.com	1041@hightech.com	会计核算
2017-11-08 17:26:17	smtp	10.64.105.88	3310	10.5.71.60	25	1368@hightech.com	1041@hightech.com	成本控制
2017-11-08 17:51:42	smtp	10.64.105.12	2895	10.5.71.60	25	1342@hightech.com	1041@hightech.com	会计核算
2017-11-08 18:23:54	smtp	10.64.105.215	3073	10.5.71.60	25	1346@hightech.com	1041@hightech.com	会计核算
2017-11-09 09:31:43	smtp	10.64.105.15	1766	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-09 09:42:14	smtp	10.64.106.30	2352	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-09 09:45:37	smtp	10.64.105.81	2426	10.5.71.60	25	1327@hightech.com	1041@hightech.com	会计核算
2017-11-09 09:46:39	smtp	10.64.105.243	2271	10.5.71.60	25	1369@hightech.com	1041@hightech.com	资金
2017-11-09 09:49:12	smtp	10.64.106.16	2241	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-09 09:56:12	smtp	10.64.105.225	1753	10.5.71.60	25	1370@hightech.com	1041@hightech.com	会计核算
2017-11-09 09:56:15	smtp	10.64.105.205	1626	10.5.71.60	25	1255@hightech.com	1041@hightech.com	资金
2017-11-09 09:56:22	smtp	10.64.105.81	2422	10.5.71.60	25	1327@hightech.com	1041@hightech.com	财务分析
2017-11-09 10:10:35	smtp	10.64.105.15	1765	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-09 10:17:01	smtp	10.64.106.23	1956	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-09 10:17:25	smtp	10.64.105.235	2304	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-09 10:24:25	smtp	10.64.105.215	1782	10.5.71.60	25	1346@hightech.com	1041@hightech.com	资金
2017-11-09 10:28:19	smtp	10.64.105.43	1924	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-09 10:32:18	smtp	10.64.105.225	1755	10.5.71.60	25	1370@hightech.com	1041@hightech.com	资金
2017-11-09 10:44:10	smtp	10.64.105.83	2411	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-09 11:02:59	smtp	10.64.105.248	2407	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-09 11:11:26	smtp	10.64.105.231	2271	10.5.71.60	25	1213@hightech.com	1041@hightech.com	会计核算
2017-11-09 11:30:56	smtp	10.64.106.30	2352	10.5.71.60	25	1137@hightech.com	1041@hightech.com	成本控制
2017-11-09 11:42:33	smtp	10.64.105.71	1988	10.5.71.60	25	1180@hightech.com	1041@hightech.com	财务分析
2017-11-09 11:50:52	smtp	219.142.78.230	2461	10.5.71.60	25	85d98c712c381ccfa62f20bbb7abb51c@sina.com	1041@hightech.com	财务
2017-11-09 12:19:00	smtp	10.64.105.81	2423	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-09 12:25:00	smtp	10.64.105.29	1839	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-09 13:54:29	smtp	10.64.105.198	2959	10.5.71.60	25	1467@hightech.com	1041@hightech.com	税务
2017-11-09 13:59:13	smtp	10.64.105.12	2842	10.5.71.60	25	1342@hightech.com	1041@hightech.com	成本控制
2017-11-09 14:29:44	smtp	10.64.105.90	3168	10.5.71.60	25	1226@hightech.com	1041@hightech.com	成本控制
2017-11-09 14:39:11	smtp	10.64.105.29	2347	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-09 15:03:08	smtp	10.64.105.235	3007	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-09 15:24:01	smtp	10.64.105.215	2575	10.5.71.60	25	1346@hightech.com	1041@hightech.com	资金
2017-11-09 15:30:27	smtp	10.64.105.29	2322	10.5.71.60	25	1451@hightech.com	1041@hightech.com	会计核算
2017-11-09 15:47:42	smtp	10.64.105.8	3456	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-09 15:54:14	smtp	10.64.105.43	2472	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-09 16:10:26	smtp	10.64.105.83	3162	10.5.71.60	25	1431@hightech.com	1041@hightech.com	税务
2017-11-09 16:18:14	smtp	10.64.105.43	2474	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-09 16:26:46	smtp	10.64.105.243	2712	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-09 17:32:44	smtp	10.64.105.29	2346	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-09 17:46:02	smtp	10.64.105.231	3036	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-09 17:46:25	smtp	10.64.105.231	3025	10.5.71.60	25	1213@hightech.com	1041@hightech.com	财务分析
2017-11-09 18:53:55	smtp	10.64.106.16	3126	10.5.71.60	25	1347@hightech.com	1041@hightech.com	财务分析
2017-11-10 09:31:33	smtp	10.64.105.90	1910	10.5.71.60	25	1226@hightech.com	1041@hightech.com	资金
2017-11-10 09:35:06	smtp	10.64.105.83	1985	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-10 09:36:16	smtp	10.64.106.16	1993	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-10 09:36:28	smtp	10.64.105.12	1798	10.5.71.60	25	1342@hightech.com	1041@hightech.com	财务分析
2017-11-10 09:47:03	smtp	10.64.106.23	1823	10.5.71.60	25	1248@hightech.com	1041@hightech.com	财务分析
2017-11-10 09:49:46	smtp	10.64.105.215	1816	10.5.71.60	25	1346@hightech.com	1041@hightech.com	会计核算
2017-11-10 09:53:55	smtp	10.64.105.248	2399	10.5.71.60	25	1293@hightech.com	1041@hightech.com	税务
2017-11-10 10:22:37	smtp	10.64.106.16	1991	10.5.71.60	25	1347@hightech.com	1041@hightech.com	成本控制
2017-11-10 10:41:49	smtp	10.64.105.83	1994	10.5.71.60	25	1431@hightech.com	1041@hightech.com	会计核算
2017-11-10 11:27:00	smtp	10.64.105.231	2365	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-10 11:35:16	smtp	10.64.105.71	1924	10.5.71.60	25	1180@hightech.com	1041@hightech.com	会计核算
2017-11-10 11:46:05	smtp	10.64.105.122	1688	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-10 12:07:03	smtp	10.64.105.122	1711	10.5.71.60	25	1186@hightech.com	1041@hightech.com	资金
2017-11-10 12:26:13	smtp	10.64.105.243	2361	10.5.71.60	25	1369@hightech.com	1041@hightech.com	会计核算
2017-11-10 14:01:53	smtp	10.64.105.15	2531	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-10 14:49:02	smtp	10.64.105.88	2789	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-10 15:51:34	smtp	10.64.105.198	2781	10.5.71.60	25	1467@hightech.com	1041@hightech.com	会计核算
2017-11-10 16:02:15	smtp	10.64.105.198	2805	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-10 17:02:27	smtp	10.64.105.231	3498	10.5.71.60	25	1213@hightech.com	1041@hightech.com	会计核算
2017-11-10 17:18:10	smtp	10.64.105.122	2351	10.5.71.60	25	1186@hightech.com	1041@hightech.com	成本控制
2017-11-10 18:21:11	smtp	10.64.105.215	2612	10.5.71.60	25	1346@hightech.com	1041@hightech.com	财务分析
2017-11-11 03:00:00	smtp	10.1.4.17	49236	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-11 12:19:37	smtp	10.64.105.125	1920	10.5.71.60	25	1067@hightech.com	1041@hightech.com	公司发展规划
2017-11-12 10:30:29	smtp	10.64.105.205	2337	10.5.71.60	25	1255@hightech.com	1041@hightech.com	资金
2017-11-12 10:36:11	smtp	10.64.105.122	1621	10.5.71.60	25	1186@hightech.com	1041@hightech.com	资金
2017-11-12 12:14:36	smtp	10.64.105.205	2324	10.5.71.60	25	1255@hightech.com	1041@hightech.com	资金
2017-11-13 09:20:27	smtp	10.64.106.30	1895	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-13 09:23:47	smtp	10.64.105.243	2231	10.5.71.60	25	1369@hightech.com	1041@hightech.com	成本控制
2017-11-13 09:25:49	smtp	10.64.105.43	2401	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-13 09:27:59	smtp	10.64.105.122	2614	10.5.71.60	25	1186@hightech.com	1041@hightech.com	税务
2017-11-13 09:32:42	smtp	10.64.105.29	1740	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-13 09:38:15	smtp	163.177.72.176	2253	10.5.71.60	25	af7175915409949fc497c4e7edc2d180@qq.com	1041@hightech.com	财务
2017-11-13 09:40:41	smtp	10.64.105.231	1597	10.5.71.60	25	1213@hightech.com	1041@hightech.com	成本控制
2017-11-13 09:44:13	smtp	10.64.105.71	1806	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-13 09:45:35	smtp	10.64.105.215	2271	10.5.71.60	25	1346@hightech.com	1041@hightech.com	工作汇报
2017-11-13 09:45:41	smtp	10.64.105.88	2586	10.5.71.60	25	1368@hightech.com	1041@hightech.com	税务
2017-11-13 09:47:33	smtp	10.64.105.248	2562	10.5.71.60	25	1293@hightech.com	1041@hightech.com	财务分析
2017-11-13 09:53:51	smtp	10.64.106.23	2294	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-13 09:56:48	smtp	10.64.105.243	2229	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-13 10:24:02	smtp	10.64.105.225	2498	10.5.71.60	25	1370@hightech.com	1041@hightech.com	成本控制
2017-11-13 10:34:31	smtp	10.64.105.198	2397	10.5.71.60	25	1467@hightech.com	1041@hightech.com	会计核算
2017-11-13 10:35:08	smtp	10.64.106.23	2297	10.5.71.60	25	1248@hightech.com	1041@hightech.com	财务分析
2017-11-13 11:07:49	smtp	10.64.105.122	2646	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-13 11:13:33	smtp	10.64.105.43	2405	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-13 11:24:14	smtp	10.64.105.248	2577	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-13 11:26:00	smtp	10.64.106.23	2273	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-13 11:30:44	smtp	10.64.105.81	1997	10.5.71.60	25	1327@hightech.com	1041@hightech.com	财务分析
2017-11-13 11:34:22	smtp	10.64.105.90	2415	10.5.71.60	25	1226@hightech.com	1041@hightech.com	税务
2017-11-13 11:55:39	smtp	10.64.105.122	2636	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-13 12:01:46	smtp	10.64.105.22	2149	10.5.71.60	25	1439@hightech.com	1041@hightech.com	会计核算
2017-11-13 12:02:35	smtp	10.64.105.71	1781	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-13 12:03:20	smtp	10.64.106.30	1922	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-13 12:13:53	smtp	10.64.105.43	2406	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-13 12:27:29	smtp	10.64.106.16	2118	10.5.71.60	25	1347@hightech.com	1041@hightech.com	税务
2017-11-13 13:49:44	smtp	10.64.105.15	2101	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-13 13:59:05	smtp	10.64.106.23	3380	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-13 14:38:39	smtp	10.64.105.15	2143	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-13 14:45:21	smtp	10.64.105.231	2274	10.5.71.60	25	1213@hightech.com	1041@hightech.com	工作汇报
2017-11-13 15:19:40	smtp	10.64.105.29	2825	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-13 15:28:32	smtp	10.64.105.231	2287	10.5.71.60	25	1213@hightech.com	1041@hightech.com	税务
2017-11-13 15:36:07	smtp	10.64.105.122	3269	10.5.71.60	25	1186@hightech.com	1041@hightech.com	成本控制
2017-11-13 17:04:12	smtp	10.64.105.235	2919	10.5.71.60	25	1498@hightech.com	1041@hightech.com	税务
2017-11-13 17:14:20	smtp	10.64.105.215	3058	10.5.71.60	25	1346@hightech.com	1041@hightech.com	税务
2017-11-13 18:07:09	smtp	10.64.105.243	2791	10.5.71.60	25	1369@hightech.com	1041@hightech.com	会计核算
2017-11-14 09:26:03	smtp	10.64.105.83	2478	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-14 09:29:09	smtp	10.64.106.30	2575	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-14 09:34:10	smtp	10.64.105.22	2266	10.5.71.60	25	1439@hightech.com	1041@hightech.com	会计核算
2017-11-14 09:41:41	smtp	10.64.105.88	1577	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-14 09:50:43	smtp	10.64.105.15	1724	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-14 10:06:03	smtp	10.64.105.81	2106	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-14 10:14:39	smtp	10.64.105.71	2141	10.5.71.60	25	1180@hightech.com	1041@hightech.com	资金
2017-11-14 10:18:52	smtp	10.64.106.30	2590	10.5.71.60	25	1137@hightech.com	1041@hightech.com	会计核算
2017-11-14 10:30:06	smtp	14.17.32.47	2157	10.5.71.60	25	a8f7a39f630b4c0204905ebd730e6ab2@foxmail.com	1041@hightech.com	财务
2017-11-14 11:01:19	smtp	10.64.105.43	2066	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-14 11:14:25	smtp	10.64.105.8	1933	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-14 11:37:43	smtp	10.64.105.22	2267	10.5.71.60	25	1439@hightech.com	1041@hightech.com	税务
2017-11-14 11:47:09	smtp	10.64.106.16	2406	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-14 12:02:57	smtp	10.64.105.88	1586	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-14 12:04:50	smtp	10.64.106.23	2180	10.5.71.60	25	1248@hightech.com	1041@hightech.com	工作汇报
2017-11-14 12:17:40	smtp	10.64.105.12	2087	10.5.71.60	25	1342@hightech.com	1041@hightech.com	工作汇报
2017-11-14 13:53:25	smtp	10.64.105.125	2193	10.5.71.60	25	1067@hightech.com	1041@hightech.com	年度计划
2017-11-14 14:20:31	smtp	10.64.105.81	3154	10.5.71.60	25	1327@hightech.com	1041@hightech.com	成本控制
2017-11-14 14:32:38	smtp	10.64.105.198	3144	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-14 14:36:29	smtp	10.64.105.122	2508	10.5.71.60	25	1186@hightech.com	1041@hightech.com	财务分析
2017-11-14 14:41:49	smtp	10.64.105.235	3181	10.5.71.60	25	1498@hightech.com	1041@hightech.com	会计核算
2017-11-14 15:02:05	smtp	10.64.105.205	3249	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-14 15:18:14	smtp	10.64.105.205	3279	10.5.71.60	25	1255@hightech.com	1041@hightech.com	成本控制
2017-11-14 15:43:47	smtp	10.64.105.88	2243	10.5.71.60	25	1368@hightech.com	1041@hightech.com	资金
2017-11-14 16:06:47	smtp	111.202.126.72	2510	10.5.71.60	25	0ac77974c830b709af62a385f80773ec@sohu.com	1041@hightech.com	财务
2017-11-14 18:27:21	smtp	10.64.105.43	2787	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-15 09:24:01	smtp	10.64.105.43	1639	10.5.71.60	25	1124@hightech.com	1041@hightech.com	资金
2017-11-15 09:35:45	smtp	10.64.105.83	2166	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-15 09:42:56	smtp	10.64.105.231	2175	10.5.71.60	25	1213@hightech.com	1041@hightech.com	财务分析
2017-11-15 09:43:17	smtp	10.64.105.8	2155	10.5.71.60	25	1108@hightech.com	1041@hightech.com	资金
2017-11-15 09:54:40	smtp	10.64.105.231	2192	10.5.71.60	25	1213@hightech.com	1041@hightech.com	工作汇报
2017-11-15 09:55:22	smtp	10.64.105.90	2306	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-15 10:07:42	smtp	10.64.105.122	2068	10.5.71.60	25	1186@hightech.com	1041@hightech.com	税务
2017-11-15 10:20:37	smtp	10.64.105.90	2294	10.5.71.60	25	1226@hightech.com	1041@hightech.com	税务
2017-11-15 10:54:21	smtp	10.64.106.30	1928	10.5.71.60	25	1137@hightech.com	1041@hightech.com	税务
2017-11-15 11:22:16	smtp	10.64.105.8	2143	10.5.71.60	25	1108@hightech.com	1041@hightech.com	财务分析
2017-11-15 11:29:22	smtp	10.64.105.235	2382	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-15 11:29:37	smtp	10.64.106.23	2049	10.5.71.60	25	1248@hightech.com	1041@hightech.com	会计核算
2017-11-15 11:33:15	smtp	10.64.105.29	1998	10.5.71.60	25	1451@hightech.com	1041@hightech.com	税务
2017-11-15 11:36:11	smtp	10.64.106.16	2188	10.5.71.60	25	1347@hightech.com	1041@hightech.com	成本控制
2017-11-15 11:46:07	smtp	10.64.105.231	2178	10.5.71.60	25	1213@hightech.com	1041@hightech.com	财务分析
2017-11-15 13:40:48	smtp	219.142.78.230	3371	10.5.71.60	25	d530f183c7e2b422b583491ca8c3b4be@sina.com	1041@hightech.com	财务
2017-11-15 13:54:01	smtp	10.64.106.23	2714	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-15 14:08:39	smtp	10.64.105.12	2156	10.5.71.60	25	1342@hightech.com	1041@hightech.com	成本控制
2017-11-15 14:10:04	smtp	10.64.106.23	2722	10.5.71.60	25	1248@hightech.com	1041@hightech.com	工作汇报
2017-11-15 14:24:54	smtp	10.64.105.231	2799	10.5.71.60	25	1213@hightech.com	1041@hightech.com	税务
2017-11-15 14:26:09	smtp	10.64.105.90	3171	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-15 14:27:42	smtp	10.64.105.205	2754	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-15 14:36:04	smtp	10.64.105.71	2982	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-15 14:44:15	smtp	10.64.105.43	2368	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-15 15:01:34	smtp	10.64.106.30	2508	10.5.71.60	25	1137@hightech.com	1041@hightech.com	税务
2017-11-15 15:07:16	smtp	10.64.105.88	2612	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-15 15:13:23	smtp	10.64.105.205	2755	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-15 15:20:03	smtp	10.64.105.22	2551	10.5.71.60	25	1439@hightech.com	1041@hightech.com	成本控制
2017-11-15 15:30:15	smtp	10.64.105.231	2796	10.5.71.60	25	1213@hightech.com	1041@hightech.com	成本控制
2017-11-15 15:43:21	smtp	10.64.105.12	2163	10.5.71.60	25	1342@hightech.com	1041@hightech.com	税务
2017-11-15 16:01:51	smtp	10.64.105.43	2356	10.5.71.60	25	1124@hightech.com	1041@hightech.com	资金
2017-11-15 16:40:35	smtp	10.64.105.198	3210	10.5.71.60	25	1467@hightech.com	1041@hightech.com	资金
2017-11-15 17:35:01	smtp	10.64.105.231	2801	10.5.71.60	25	1213@hightech.com	1041@hightech.com	财务分析
2017-11-15 17:36:59	smtp	10.64.105.235	3062	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-15 17:52:29	smtp	10.64.105.81	3320	10.5.71.60	25	1327@hightech.com	1041@hightech.com	税务
2017-11-15 19:10:28	smtp	10.64.105.215	2717	10.5.71.60	25	1346@hightech.com	1041@hightech.com	财务分析
2017-11-16 09:33:47	smtp	10.64.105.225	2231	10.5.71.60	25	1370@hightech.com	1041@hightech.com	资金
2017-11-16 09:39:15	smtp	10.64.105.243	2102	10.5.71.60	25	1369@hightech.com	1041@hightech.com	成本控制
2017-11-16 09:54:44	smtp	10.64.105.248	2492	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-16 10:18:55	smtp	10.64.105.15	2254	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-16 10:26:48	smtp	10.64.105.225	2227	10.5.71.60	25	1370@hightech.com	1041@hightech.com	成本控制
2017-11-16 10:51:36	smtp	10.64.105.8	1602	10.5.71.60	25	1108@hightech.com	1041@hightech.com	财务分析
2017-11-16 11:23:19	smtp	10.64.105.198	2518	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-16 11:37:50	smtp	10.64.105.29	2107	10.5.71.60	25	1451@hightech.com	1041@hightech.com	会计核算
2017-11-16 13:54:46	smtp	10.64.105.12	2409	10.5.71.60	25	1342@hightech.com	1041@hightech.com	成本控制
2017-11-16 13:55:46	smtp	10.64.105.29	2609	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-16 14:26:33	smtp	10.64.105.43	3057	10.5.71.60	25	1124@hightech.com	1041@hightech.com	税务
2017-11-16 14:39:28	smtp	10.64.105.12	2375	10.5.71.60	25	1342@hightech.com	1041@hightech.com	资金
2017-11-16 14:45:07	smtp	10.64.105.215	3082	10.5.71.60	25	1346@hightech.com	1041@hightech.com	税务
2017-11-16 14:55:23	smtp	10.64.105.235	3290	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-16 15:01:21	smtp	10.64.105.43	3063	10.5.71.60	25	1124@hightech.com	1041@hightech.com	税务
2017-11-16 15:05:57	smtp	10.64.105.83	2379	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-16 15:10:26	smtp	10.64.106.23	2829	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-16 15:47:25	smtp	10.64.105.71	3074	10.5.71.60	25	1180@hightech.com	1041@hightech.com	财务分析
2017-11-16 15:51:54	smtp	10.64.106.23	2861	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-16 15:56:05	smtp	10.64.105.83	2391	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-16 16:07:25	smtp	10.64.105.205	2145	10.5.71.60	25	1255@hightech.com	1041@hightech.com	成本控制
2017-11-16 16:15:09	smtp	10.64.105.90	3073	10.5.71.60	25	1226@hightech.com	1041@hightech.com	资金
2017-11-16 16:43:57	smtp	10.64.105.90	3065	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-16 17:01:04	smtp	10.64.105.205	2166	10.5.71.60	25	1255@hightech.com	1041@hightech.com	成本控制
2017-11-17 03:00:00	smtp	10.1.4.17	49205	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	迟到
2017-11-17 09:34:30	smtp	10.64.105.29	2352	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-17 09:49:38	smtp	10.64.105.243	1536	10.5.71.60	25	1369@hightech.com	1041@hightech.com	会计核算
2017-11-17 09:50:51	smtp	10.64.105.215	2294	10.5.71.60	25	1346@hightech.com	1041@hightech.com	会计核算
2017-11-17 09:51:13	smtp	10.64.105.81	2013	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-17 10:20:08	smtp	10.64.105.12	2561	10.5.71.60	25	1342@hightech.com	1041@hightech.com	财务分析
2017-11-17 10:35:05	smtp	10.64.105.22	2167	10.5.71.60	25	1439@hightech.com	1041@hightech.com	工作汇报
2017-11-17 10:46:34	smtp	10.64.105.198	2475	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-17 11:05:34	smtp	10.64.105.83	1994	10.5.71.60	25	1431@hightech.com	1041@hightech.com	会计核算
2017-11-17 11:11:44	smtp	10.64.105.81	2023	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-17 11:23:15	smtp	10.64.105.15	1960	10.5.71.60	25	1253@hightech.com	1041@hightech.com	税务
2017-11-17 11:23:56	smtp	10.64.105.22	2173	10.5.71.60	25	1439@hightech.com	1041@hightech.com	成本控制
2017-11-17 11:26:50	smtp	10.64.105.71	2316	10.5.71.60	25	1180@hightech.com	1041@hightech.com	财务分析
2017-11-17 12:12:59	smtp	10.64.105.88	2496	10.5.71.60	25	1368@hightech.com	1041@hightech.com	税务
2017-11-17 14:12:46	smtp	10.64.105.248	3053	10.5.71.60	25	1293@hightech.com	1041@hightech.com	工作汇报
2017-11-17 14:30:53	smtp	163.177.72.176	2212	10.5.71.60	25	e97f987c211f0bc27a12d29c18998e2a@qq.com	1041@hightech.com	财务
2017-11-17 15:22:46	smtp	10.64.105.243	2363	10.5.71.60	25	1369@hightech.com	1041@hightech.com	成本控制
2017-11-17 15:37:10	smtp	10.64.105.90	3160	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-17 15:43:45	smtp	10.64.105.198	3350	10.5.71.60	25	1467@hightech.com	1041@hightech.com	资金
2017-11-17 16:54:35	smtp	10.64.105.43	2855	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-17 16:55:01	smtp	10.64.105.248	3055	10.5.71.60	25	1293@hightech.com	1041@hightech.com	成本控制
2017-11-17 17:00:27	smtp	10.64.105.122	3057	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-17 17:26:08	smtp	10.64.105.235	2724	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-17 17:34:54	smtp	10.64.105.29	3071	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-17 17:52:53	smtp	10.64.105.81	2827	10.5.71.60	25	1327@hightech.com	1041@hightech.com	成本控制
2017-11-17 18:07:28	smtp	10.64.105.8	2313	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-17 18:12:03	smtp	10.64.105.8	2312	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-17 19:35:03	smtp	10.64.105.231	2345	10.5.71.60	25	1213@hightech.com	1041@hightech.com	成本控制
2017-11-18 04:00:00	smtp	10.1.4.17	49198	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	迟到
2017-11-19 09:34:50	smtp	10.64.105.122	2237	10.5.71.60	25	1186@hightech.com	1041@hightech.com	财务分析
2017-11-19 09:46:10	smtp	10.64.105.198	2105	10.5.71.60	25	1467@hightech.com	1041@hightech.com	税务
2017-11-19 09:46:19	smtp	10.64.105.29	2483	10.5.71.60	25	1451@hightech.com	1041@hightech.com	税务
2017-11-19 10:19:17	smtp	10.64.106.16	2186	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-19 10:42:25	smtp	10.64.105.248	1816	10.5.71.60	25	1293@hightech.com	1041@hightech.com	财务分析
2017-11-19 10:45:50	smtp	10.64.105.83	2450	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-19 11:07:09	smtp	10.64.105.122	2238	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-19 11:10:30	smtp	10.64.105.12	1959	10.5.71.60	25	1342@hightech.com	1041@hightech.com	税务
2017-11-19 11:13:52	smtp	10.64.105.248	1787	10.5.71.60	25	1293@hightech.com	1041@hightech.com	资金
2017-11-19 11:25:24	smtp	10.64.105.215	1766	10.5.71.60	25	1346@hightech.com	1041@hightech.com	财务分析
2017-11-19 11:47:48	smtp	10.64.105.43	2084	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-19 13:50:34	smtp	10.64.105.205	2086	10.5.71.60	25	1255@hightech.com	1041@hightech.com	工作汇报
2017-11-19 16:29:59	smtp	10.64.105.122	3165	10.5.71.60	25	1186@hightech.com	1041@hightech.com	税务
2017-11-19 16:41:31	smtp	10.64.106.16	3152	10.5.71.60	25	1347@hightech.com	1041@hightech.com	税务
2017-11-20 09:26:49	smtp	10.64.105.205	1834	10.5.71.60	25	1255@hightech.com	1041@hightech.com	税务
2017-11-20 09:38:48	smtp	10.64.105.12	1977	10.5.71.60	25	1342@hightech.com	1041@hightech.com	工作汇报
2017-11-20 09:39:17	smtp	10.64.105.235	2059	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-20 09:44:07	smtp	10.64.105.248	2294	10.5.71.60	25	1293@hightech.com	1041@hightech.com	成本控制
2017-11-20 09:48:01	smtp	10.64.105.88	1839	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-20 10:20:19	smtp	10.64.105.248	2265	10.5.71.60	25	1293@hightech.com	1041@hightech.com	财务分析
2017-11-20 10:21:45	smtp	10.64.105.71	2181	10.5.71.60	25	1180@hightech.com	1041@hightech.com	会计核算
2017-11-20 10:24:16	smtp	10.64.105.198	2198	10.5.71.60	25	1467@hightech.com	1041@hightech.com	税务
2017-11-20 11:01:53	smtp	10.64.105.90	1820	10.5.71.60	25	1226@hightech.com	1041@hightech.com	资金
2017-11-20 11:16:53	smtp	10.64.105.8	2184	10.5.71.60	25	1108@hightech.com	1041@hightech.com	税务
2017-11-20 11:22:27	smtp	10.64.105.12	1935	10.5.71.60	25	1342@hightech.com	1041@hightech.com	会计核算
2017-11-20 11:40:27	smtp	10.64.105.231	1826	10.5.71.60	25	1213@hightech.com	1041@hightech.com	税务
2017-11-20 11:42:37	smtp	10.64.105.8	2199	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-20 11:56:19	smtp	10.64.105.88	1807	10.5.71.60	25	1368@hightech.com	1041@hightech.com	工作汇报
2017-11-20 13:45:38	smtp	10.64.106.23	3333	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-20 14:17:03	smtp	10.64.105.235	2752	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-20 15:48:15	smtp	10.64.105.29	2237	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-20 16:12:34	smtp	10.64.105.122	3083	10.5.71.60	25	1186@hightech.com	1041@hightech.com	税务
2017-11-21 04:00:00	smtp	10.1.4.17	49204	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-21 09:21:47	smtp	10.64.105.83	2291	10.5.71.60	25	1431@hightech.com	1041@hightech.com	工作汇报
2017-11-21 09:38:27	smtp	10.64.105.243	2264	10.5.71.60	25	1369@hightech.com	1041@hightech.com	资金
2017-11-21 09:38:50	smtp	10.64.105.122	2000	10.5.71.60	25	1186@hightech.com	1041@hightech.com	成本控制
2017-11-21 09:45:41	smtp	10.64.105.15	2570	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-21 09:49:56	smtp	10.64.105.88	2177	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-21 09:51:23	smtp	10.64.105.231	2193	10.5.71.60	25	1213@hightech.com	1041@hightech.com	会计核算
2017-11-21 09:51:42	smtp	10.64.105.90	1974	10.5.71.60	25	1226@hightech.com	1041@hightech.com	资金
2017-11-21 09:53:22	smtp	10.64.105.43	1690	10.5.71.60	25	1124@hightech.com	1041@hightech.com	税务
2017-11-21 09:54:06	smtp	10.64.105.235	2133	10.5.71.60	25	1498@hightech.com	1041@hightech.com	会计核算
2017-11-21 09:54:55	smtp	10.64.105.243	2262	10.5.71.60	25	1369@hightech.com	1041@hightech.com	税务
2017-11-21 10:11:23	smtp	10.64.105.43	1683	10.5.71.60	25	1124@hightech.com	1041@hightech.com	成本控制
2017-11-21 10:22:42	smtp	10.64.105.225	1973	10.5.71.60	25	1370@hightech.com	1041@hightech.com	工作汇报
2017-11-21 10:47:48	smtp	219.142.78.230	2160	10.5.71.60	25	9268d5bb44bd256470a0efe30569b5a4@sina.com	1041@hightech.com	财务
2017-11-21 11:13:28	smtp	10.64.105.235	2147	10.5.71.60	25	1498@hightech.com	1041@hightech.com	会计核算
2017-11-21 11:40:08	smtp	10.64.105.81	1665	10.5.71.60	25	1327@hightech.com	1041@hightech.com	成本控制
2017-11-21 11:54:06	smtp	10.64.105.215	2588	10.5.71.60	25	1346@hightech.com	1041@hightech.com	财务分析
2017-11-21 13:50:23	smtp	10.64.105.83	2989	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-21 14:14:33	smtp	10.64.105.225	2699	10.5.71.60	25	1370@hightech.com	1041@hightech.com	成本控制
2017-11-21 14:19:55	smtp	10.64.105.225	2689	10.5.71.60	25	1370@hightech.com	1041@hightech.com	会计核算
2017-11-21 14:31:02	smtp	10.64.106.16	2712	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-21 15:05:00	smtp	10.64.105.15	3378	10.5.71.60	25	1253@hightech.com	1041@hightech.com	会计核算
2017-11-21 15:11:06	smtp	10.64.105.122	2827	10.5.71.60	25	1186@hightech.com	1041@hightech.com	财务分析
2017-11-21 15:32:12	smtp	10.64.105.29	3056	10.5.71.60	25	1451@hightech.com	1041@hightech.com	资金
2017-11-21 16:45:02	smtp	10.64.105.43	2349	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-21 19:17:21	smtp	10.64.105.8	3063	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-22 04:00:00	smtp	10.1.4.17	49232	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-22 09:21:34	smtp	10.64.105.235	2473	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-22 09:35:29	smtp	10.64.105.88	2387	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-22 09:40:13	smtp	10.64.105.248	2024	10.5.71.60	25	1293@hightech.com	1041@hightech.com	成本控制
2017-11-22 09:53:50	smtp	10.64.105.248	2017	10.5.71.60	25	1293@hightech.com	1041@hightech.com	税务
2017-11-22 09:57:03	smtp	10.64.105.122	1975	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-22 09:58:07	smtp	10.64.105.8	1685	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-22 10:20:44	smtp	10.64.105.243	1691	10.5.71.60	25	1369@hightech.com	1041@hightech.com	财务分析
2017-11-22 11:11:16	smtp	10.64.105.198	2198	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-22 11:16:42	smtp	10.64.105.15	2085	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-22 11:21:59	smtp	10.64.105.231	1749	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-22 11:36:19	smtp	10.64.105.71	1697	10.5.71.60	25	1180@hightech.com	1041@hightech.com	成本控制
2017-11-22 11:42:03	smtp	10.64.105.235	2457	10.5.71.60	25	1498@hightech.com	1041@hightech.com	会计核算
2017-11-22 11:58:58	smtp	10.64.105.83	2413	10.5.71.60	25	1431@hightech.com	1041@hightech.com	税务
2017-11-22 13:41:09	smtp	10.64.105.22	2619	10.5.71.60	25	1439@hightech.com	1041@hightech.com	会计核算
2017-11-22 13:41:26	smtp	10.64.105.43	3058	10.5.71.60	25	1124@hightech.com	1041@hightech.com	财务分析
2017-11-22 13:52:37	smtp	10.64.106.23	2603	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-22 13:58:50	smtp	10.64.105.88	3194	10.5.71.60	25	1368@hightech.com	1041@hightech.com	资金
2017-11-22 13:59:21	smtp	10.64.105.205	2657	10.5.71.60	25	1255@hightech.com	1041@hightech.com	工作汇报
2017-11-22 13:59:27	smtp	10.64.105.71	2198	10.5.71.60	25	1180@hightech.com	1041@hightech.com	财务分析
2017-11-22 14:37:32	smtp	10.64.105.15	3106	10.5.71.60	25	1253@hightech.com	1041@hightech.com	税务
2017-11-22 14:47:40	smtp	10.64.105.231	2666	10.5.71.60	25	1213@hightech.com	1041@hightech.com	成本控制
2017-11-22 15:04:56	smtp	10.64.105.29	3242	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-22 15:33:22	smtp	10.64.105.43	3053	10.5.71.60	25	1124@hightech.com	1041@hightech.com	财务分析
2017-11-22 15:47:41	smtp	10.64.105.22	2621	10.5.71.60	25	1439@hightech.com	1041@hightech.com	工作汇报
2017-11-22 16:48:03	smtp	10.64.105.29	3247	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-22 17:02:18	smtp	10.64.105.198	2939	10.5.71.60	25	1467@hightech.com	1041@hightech.com	财务分析
2017-11-22 17:23:37	smtp	10.64.105.215	2909	10.5.71.60	25	1346@hightech.com	1041@hightech.com	资金
2017-11-22 18:43:31	smtp	219.142.78.230	2673	10.5.71.60	25	1886600032bf4c8d35aff87af47064d5@sina.com	1041@hightech.com	财务
2017-11-22 18:52:08	smtp	10.64.106.16	2582	10.5.71.60	25	1347@hightech.com	1041@hightech.com	工作汇报
2017-11-23 09:35:00	smtp	10.64.105.225	2252	10.5.71.60	25	1370@hightech.com	1041@hightech.com	税务
2017-11-23 09:41:06	smtp	10.64.106.30	2426	10.5.71.60	25	1137@hightech.com	1041@hightech.com	财务分析
2017-11-23 09:52:47	smtp	10.64.106.16	2522	10.5.71.60	25	1347@hightech.com	1041@hightech.com	税务
2017-11-23 09:59:43	smtp	10.64.105.29	1779	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-23 10:06:46	smtp	10.64.105.231	2109	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-23 10:08:42	smtp	10.64.105.215	1782	10.5.71.60	25	1346@hightech.com	1041@hightech.com	工作汇报
2017-11-23 10:12:11	smtp	10.64.105.231	2118	10.5.71.60	25	1213@hightech.com	1041@hightech.com	成本控制
2017-11-23 10:18:57	smtp	10.64.105.205	1902	10.5.71.60	25	1255@hightech.com	1041@hightech.com	财务分析
2017-11-23 11:16:15	smtp	10.64.105.29	1799	10.5.71.60	25	1451@hightech.com	1041@hightech.com	会计核算
2017-11-23 11:28:24	smtp	10.64.105.205	1897	10.5.71.60	25	1255@hightech.com	1041@hightech.com	财务分析
2017-11-23 11:39:08	smtp	10.64.105.43	2530	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-23 11:41:00	smtp	10.64.105.15	2661	10.5.71.60	25	1253@hightech.com	1041@hightech.com	税务
2017-11-23 11:55:31	smtp	10.64.105.88	1727	10.5.71.60	25	1368@hightech.com	1041@hightech.com	工作汇报
2017-11-23 11:58:17	smtp	10.64.105.231	2092	10.5.71.60	25	1213@hightech.com	1041@hightech.com	财务分析
2017-11-23 12:09:12	smtp	10.64.105.15	2678	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-23 12:18:38	smtp	10.64.106.16	2508	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-23 12:28:51	smtp	10.64.105.125	2033	10.5.71.60	25	1067@hightech.com	1041@hightech.com	公司发展规划
2017-11-23 13:34:30	smtp	10.64.105.43	3248	10.5.71.60	25	1124@hightech.com	1041@hightech.com	资金
2017-11-23 14:07:05	smtp	10.64.105.122	2735	10.5.71.60	25	1186@hightech.com	1041@hightech.com	财务分析
2017-11-23 14:13:33	smtp	10.64.105.248	2497	10.5.71.60	25	1293@hightech.com	1041@hightech.com	工作汇报
2017-11-23 14:38:54	smtp	10.64.105.29	2803	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-23 14:44:29	smtp	10.64.105.243	2488	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-23 14:46:21	smtp	10.64.105.8	3143	10.5.71.60	25	1108@hightech.com	1041@hightech.com	资金
2017-11-23 15:40:35	smtp	10.64.105.231	2893	10.5.71.60	25	1213@hightech.com	1041@hightech.com	会计核算
2017-11-23 15:49:18	smtp	10.64.106.16	3371	10.5.71.60	25	1347@hightech.com	1041@hightech.com	工作汇报
2017-11-23 16:00:42	smtp	10.64.105.90	2801	10.5.71.60	25	1226@hightech.com	1041@hightech.com	会计核算
2017-11-23 16:07:08	smtp	10.64.105.22	2749	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-23 16:27:33	smtp	10.64.105.88	2617	10.5.71.60	25	1368@hightech.com	1041@hightech.com	成本控制
2017-11-23 16:38:38	smtp	10.64.105.15	3697	10.5.71.60	25	1253@hightech.com	1041@hightech.com	成本控制
2017-11-23 16:38:51	smtp	10.64.106.30	3069	10.5.71.60	25	1137@hightech.com	1041@hightech.com	税务
2017-11-23 17:36:36	smtp	10.64.105.22	2748	10.5.71.60	25	1439@hightech.com	1041@hightech.com	税务
2017-11-23 18:36:15	smtp	10.64.105.22	2740	10.5.71.60	25	1439@hightech.com	1041@hightech.com	会计核算
2017-11-24 09:29:49	smtp	10.64.105.198	2431	10.5.71.60	25	1467@hightech.com	1041@hightech.com	资金
2017-11-24 09:41:09	smtp	10.64.105.248	2083	10.5.71.60	25	1293@hightech.com	1041@hightech.com	财务分析
2017-11-24 09:44:32	smtp	10.64.105.231	2381	10.5.71.60	25	1213@hightech.com	1041@hightech.com	工作汇报
2017-11-24 09:54:20	smtp	10.64.105.235	2419	10.5.71.60	25	1498@hightech.com	1041@hightech.com	会计核算
2017-11-24 10:05:16	smtp	10.64.105.205	2446	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-24 10:21:20	smtp	10.64.105.243	1928	10.5.71.60	25	1369@hightech.com	1041@hightech.com	会计核算
2017-11-24 11:21:23	smtp	10.64.106.23	1825	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-24 11:50:02	smtp	10.64.105.235	2417	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-24 11:54:09	smtp	10.64.105.8	1645	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-24 12:22:02	smtp	10.64.105.90	2127	10.5.71.60	25	1226@hightech.com	1041@hightech.com	税务
2017-11-24 14:01:27	smtp	10.64.106.30	2991	10.5.71.60	25	1137@hightech.com	1041@hightech.com	资金
2017-11-24 14:42:08	smtp	10.64.105.22	2227	10.5.71.60	25	1439@hightech.com	1041@hightech.com	税务
2017-11-24 14:51:36	smtp	10.64.105.22	2208	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-24 15:12:46	smtp	10.64.105.81	2562	10.5.71.60	25	1327@hightech.com	1041@hightech.com	会计核算
2017-11-24 15:31:38	smtp	10.64.105.71	2276	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-24 15:34:43	smtp	10.64.105.122	2917	10.5.71.60	25	1186@hightech.com	1041@hightech.com	资金
2017-11-24 15:36:18	smtp	10.64.105.88	2574	10.5.71.60	25	1368@hightech.com	1041@hightech.com	财务分析
2017-11-24 16:14:04	smtp	10.64.105.235	3365	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-24 16:28:34	smtp	10.64.105.15	2503	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-24 17:02:06	smtp	10.64.105.83	3306	10.5.71.60	25	1431@hightech.com	1041@hightech.com	成本控制
2017-11-24 17:13:28	smtp	10.64.105.29	2884	10.5.71.60	25	1451@hightech.com	1041@hightech.com	财务分析
2017-11-24 17:21:42	smtp	10.64.105.235	3346	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-24 17:26:45	smtp	10.64.106.30	2999	10.5.71.60	25	1137@hightech.com	1041@hightech.com	资金
2017-11-24 18:17:40	smtp	10.64.105.8	2380	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-24 18:43:23	smtp	10.64.105.122	2920	10.5.71.60	25	1186@hightech.com	1041@hightech.com	资金
2017-11-24 18:58:07	smtp	10.64.105.122	2923	10.5.71.60	25	1186@hightech.com	1041@hightech.com	税务
2017-11-24 19:13:35	smtp	10.64.105.225	2297	10.5.71.60	25	1370@hightech.com	1041@hightech.com	税务
2017-11-25 04:00:00	smtp	10.1.4.17	49207	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-25 09:22:23	smtp	10.64.105.215	1560	10.5.71.60	25	1346@hightech.com	1041@hightech.com	成本控制
2017-11-25 09:33:11	smtp	10.64.105.29	1826	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-25 09:38:19	smtp	10.64.106.23	1558	10.5.71.60	25	1248@hightech.com	1041@hightech.com	工作汇报
2017-11-25 09:39:49	smtp	10.64.106.30	2625	10.5.71.60	25	1137@hightech.com	1041@hightech.com	会计核算
2017-11-25 09:50:37	smtp	10.64.105.43	2399	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-25 09:53:58	smtp	10.64.105.8	2712	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-25 10:15:28	smtp	10.64.105.12	2035	10.5.71.60	25	1342@hightech.com	1041@hightech.com	资金
2017-11-25 10:17:49	smtp	10.64.105.205	2150	10.5.71.60	25	1255@hightech.com	1041@hightech.com	成本控制
2017-11-25 10:20:15	smtp	10.64.105.43	2387	10.5.71.60	25	1124@hightech.com	1041@hightech.com	财务分析
2017-11-25 10:45:00	smtp	10.64.105.243	2418	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-25 10:55:51	smtp	10.64.106.23	1554	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-25 11:01:51	smtp	10.64.105.243	2419	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-25 11:18:24	smtp	10.64.106.23	1543	10.5.71.60	25	1248@hightech.com	1041@hightech.com	成本控制
2017-11-25 11:28:50	smtp	10.64.106.23	1559	10.5.71.60	25	1248@hightech.com	1041@hightech.com	工作汇报
2017-11-25 12:14:56	smtp	10.64.105.122	2532	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-25 12:20:52	smtp	10.64.105.231	2261	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-25 13:40:08	smtp	10.64.106.23	2200	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-25 13:41:02	smtp	10.64.105.243	3296	10.5.71.60	25	1369@hightech.com	1041@hightech.com	财务分析
2017-11-25 13:53:42	smtp	10.64.105.43	3045	10.5.71.60	25	1124@hightech.com	1041@hightech.com	财务分析
2017-11-25 14:07:56	smtp	10.64.105.205	2899	10.5.71.60	25	1255@hightech.com	1041@hightech.com	成本控制
2017-11-25 14:29:58	smtp	10.64.105.198	2815	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-25 14:38:29	smtp	10.64.105.198	2814	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-25 15:02:04	smtp	10.64.105.43	3045	10.5.71.60	25	1124@hightech.com	1041@hightech.com	成本控制
2017-11-25 15:42:12	smtp	10.64.105.231	2895	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-25 16:13:33	smtp	10.64.105.15	2624	10.5.71.60	25	1253@hightech.com	1041@hightech.com	财务分析
2017-11-25 16:20:28	smtp	10.64.105.29	2838	10.5.71.60	25	1451@hightech.com	1041@hightech.com	税务
2017-11-25 16:36:32	smtp	10.64.105.81	3131	10.5.71.60	25	1327@hightech.com	1041@hightech.com	成本控制
2017-11-25 16:39:31	smtp	10.64.105.43	3076	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-25 17:24:08	smtp	10.64.105.8	3272	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-26 09:29:52	smtp	10.64.105.198	1962	10.5.71.60	25	1467@hightech.com	1041@hightech.com	工作汇报
2017-11-26 09:37:16	smtp	10.64.105.235	1925	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-26 09:53:04	smtp	10.64.105.231	2558	10.5.71.60	25	1213@hightech.com	1041@hightech.com	会计核算
2017-11-26 09:53:15	smtp	10.64.105.205	1549	10.5.71.60	25	1255@hightech.com	1041@hightech.com	税务
2017-11-26 09:55:31	smtp	10.64.105.83	2544	10.5.71.60	25	1431@hightech.com	1041@hightech.com	工作汇报
2017-11-26 10:16:10	smtp	10.64.105.12	1883	10.5.71.60	25	1342@hightech.com	1041@hightech.com	工作汇报
2017-11-26 10:17:10	smtp	10.64.105.231	2534	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-26 10:19:05	smtp	10.64.105.88	1795	10.5.71.60	25	1368@hightech.com	1041@hightech.com	工作汇报
2017-11-26 10:21:22	smtp	10.64.105.90	1925	10.5.71.60	25	1226@hightech.com	1041@hightech.com	会计核算
2017-11-26 10:31:50	smtp	10.64.106.30	1678	10.5.71.60	25	1137@hightech.com	1041@hightech.com	会计核算
2017-11-26 10:39:17	smtp	10.64.105.235	1947	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-26 11:34:51	smtp	10.64.105.71	1925	10.5.71.60	25	1180@hightech.com	1041@hightech.com	工作汇报
2017-11-26 12:14:15	smtp	10.64.106.23	1934	10.5.71.60	25	1248@hightech.com	1041@hightech.com	会计核算
2017-11-26 12:15:00	smtp	10.64.105.81	1874	10.5.71.60	25	1327@hightech.com	1041@hightech.com	工作汇报
2017-11-26 12:29:52	smtp	10.64.105.22	1772	10.5.71.60	25	1439@hightech.com	1041@hightech.com	成本控制
2017-11-26 15:01:56	smtp	10.64.106.30	2073	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-26 16:13:08	smtp	10.64.105.22	2565	10.5.71.60	25	1439@hightech.com	1041@hightech.com	工作汇报
2017-11-26 16:51:06	smtp	10.64.106.23	2745	10.5.71.60	25	1248@hightech.com	1041@hightech.com	税务
2017-11-26 17:01:39	smtp	10.64.105.71	2919	10.5.71.60	25	1180@hightech.com	1041@hightech.com	资金
2017-11-26 17:06:52	smtp	10.64.105.12	2709	10.5.71.60	25	1342@hightech.com	1041@hightech.com	会计核算
2017-11-26 17:12:40	smtp	10.64.105.29	3138	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-26 17:19:46	smtp	10.64.106.16	3243	10.5.71.60	25	1347@hightech.com	1041@hightech.com	成本控制
2017-11-26 17:25:37	smtp	10.64.105.235	2997	10.5.71.60	25	1498@hightech.com	1041@hightech.com	资金
2017-11-26 17:49:20	smtp	10.64.105.198	2708	10.5.71.60	25	1467@hightech.com	1041@hightech.com	会计核算
2017-11-27 09:26:08	smtp	10.64.105.198	2502	10.5.71.60	25	1467@hightech.com	1041@hightech.com	税务
2017-11-27 09:33:58	smtp	10.64.105.122	2114	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-27 09:49:20	smtp	10.64.105.122	2123	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-27 10:15:18	smtp	10.64.105.225	2474	10.5.71.60	25	1370@hightech.com	1041@hightech.com	财务分析
2017-11-27 10:39:56	smtp	10.64.105.22	2166	10.5.71.60	25	1439@hightech.com	1041@hightech.com	税务
2017-11-27 10:53:08	smtp	10.64.106.30	1775	10.5.71.60	25	1137@hightech.com	1041@hightech.com	资金
2017-11-27 11:02:30	smtp	10.64.105.12	2006	10.5.71.60	25	1342@hightech.com	1041@hightech.com	成本控制
2017-11-27 11:07:03	smtp	10.64.106.23	2080	10.5.71.60	25	1248@hightech.com	1041@hightech.com	会计核算
2017-11-27 11:13:07	smtp	10.64.105.231	2247	10.5.71.60	25	1213@hightech.com	1041@hightech.com	财务分析
2017-11-27 11:24:46	smtp	10.64.105.235	1700	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-27 11:31:32	smtp	10.64.105.81	1875	10.5.71.60	25	1327@hightech.com	1041@hightech.com	税务
2017-11-27 12:13:38	smtp	10.64.105.88	1702	10.5.71.60	25	1368@hightech.com	1041@hightech.com	会计核算
2017-11-27 12:28:09	smtp	10.64.105.248	2022	10.5.71.60	25	1293@hightech.com	1041@hightech.com	工作汇报
2017-11-27 13:46:20	smtp	10.64.105.198	3404	10.5.71.60	25	1467@hightech.com	1041@hightech.com	资金
2017-11-27 13:50:37	smtp	10.64.105.235	2367	10.5.71.60	25	1498@hightech.com	1041@hightech.com	资金
2017-11-27 14:09:33	smtp	10.64.106.30	2850	10.5.71.60	25	1137@hightech.com	1041@hightech.com	财务分析
2017-11-27 14:16:19	smtp	10.64.105.71	3491	10.5.71.60	25	1180@hightech.com	1041@hightech.com	成本控制
2017-11-27 14:54:02	smtp	10.64.105.8	2827	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-27 15:08:58	smtp	10.64.105.8	2839	10.5.71.60	25	1108@hightech.com	1041@hightech.com	财务分析
2017-11-27 15:13:23	smtp	10.64.105.248	2651	10.5.71.60	25	1293@hightech.com	1041@hightech.com	成本控制
2017-11-27 15:21:29	smtp	10.64.105.198	3375	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-27 15:27:07	smtp	111.202.126.72	3821	10.5.71.60	25	23c4440f70f39db1c3040e58a2b0f81a@sohu.com	1041@hightech.com	财务
2017-11-27 15:27:46	smtp	10.64.105.83	3138	10.5.71.60	25	1431@hightech.com	1041@hightech.com	税务
2017-11-27 15:49:13	smtp	10.64.105.122	2856	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-27 16:05:37	smtp	10.64.105.83	3145	10.5.71.60	25	1431@hightech.com	1041@hightech.com	资金
2017-11-27 16:51:50	smtp	10.64.105.15	2922	10.5.71.60	25	1253@hightech.com	1041@hightech.com	资金
2017-11-27 16:53:51	smtp	10.64.105.90	2961	10.5.71.60	25	1226@hightech.com	1041@hightech.com	成本控制
2017-11-27 16:55:11	smtp	10.64.106.23	3041	10.5.71.60	25	1248@hightech.com	1041@hightech.com	工作汇报
2017-11-27 17:23:44	smtp	10.64.105.81	2665	10.5.71.60	25	1327@hightech.com	1041@hightech.com	财务分析
2017-11-27 17:36:55	smtp	10.64.105.8	2839	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-27 18:51:53	smtp	10.64.105.225	3511	10.5.71.60	25	1370@hightech.com	1041@hightech.com	税务
2017-11-27 19:03:50	smtp	10.64.105.243	3111	10.5.71.60	25	1369@hightech.com	1041@hightech.com	工作汇报
2017-11-28 04:00:00	smtp	10.1.4.17	49181	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-28 09:21:00	smtp	10.64.105.231	1646	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-28 09:38:00	smtp	10.64.105.29	2132	10.5.71.60	25	1451@hightech.com	1041@hightech.com	成本控制
2017-11-28 09:46:00	smtp	10.64.105.83	1831	10.5.71.60	25	1431@hightech.com	1041@hightech.com	会计核算
2017-11-28 09:47:00	smtp	10.64.105.8	2061	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-28 09:51:00	smtp	10.64.105.71	1624	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-28 09:56:00	smtp	10.64.105.22	1823	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-28 10:33:00	smtp	10.64.105.235	2374	10.5.71.60	25	1498@hightech.com	1041@hightech.com	财务分析
2017-11-28 11:00:00	smtp	10.64.105.8	2073	10.5.71.60	25	1108@hightech.com	1041@hightech.com	资金
2017-11-28 11:14:00	smtp	10.64.105.8	2078	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-28 11:25:00	smtp	10.64.105.15	1879	10.5.71.60	25	1253@hightech.com	1041@hightech.com	工作汇报
2017-11-28 11:28:00	smtp	10.64.105.243	1866	10.5.71.60	25	1369@hightech.com	1041@hightech.com	成本控制
2017-11-28 11:30:00	smtp	10.64.106.16	1756	10.5.71.60	25	1347@hightech.com	1041@hightech.com	资金
2017-11-28 11:39:00	smtp	10.64.105.235	2376	10.5.71.60	25	1498@hightech.com	1041@hightech.com	资金
2017-11-28 11:48:00	smtp	10.64.105.122	2267	10.5.71.60	25	1186@hightech.com	1041@hightech.com	工作汇报
2017-11-28 12:04:00	smtp	10.64.105.71	1617	10.5.71.60	25	1180@hightech.com	1041@hightech.com	资金
2017-11-28 12:06:00	smtp	10.64.105.231	1677	10.5.71.60	25	1213@hightech.com	1041@hightech.com	工作汇报
2017-11-28 12:06:00	smtp	10.64.105.122	2285	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-28 12:24:00	smtp	10.64.105.225	2405	10.5.71.60	25	1370@hightech.com	1041@hightech.com	财务分析
2017-11-28 14:05:00	smtp	10.64.106.16	2246	10.5.71.60	25	1347@hightech.com	1041@hightech.com	税务
2017-11-28 14:22:00	smtp	10.64.105.22	2694	10.5.71.60	25	1439@hightech.com	1041@hightech.com	资金
2017-11-28 15:12:00	smtp	10.64.105.235	3071	10.5.71.60	25	1498@hightech.com	1041@hightech.com	成本控制
2017-11-28 16:01:00	smtp	10.64.105.243	2603	10.5.71.60	25	1369@hightech.com	1041@hightech.com	资金
2017-11-28 17:49:00	smtp	10.64.105.248	2488	10.5.71.60	25	1293@hightech.com	1041@hightech.com	工作汇报
2017-11-28 18:04:00	smtp	10.64.105.29	3192	10.5.71.60	25	1451@hightech.com	1041@hightech.com	会计核算
2017-11-29 09:28:25	smtp	10.64.106.30	2072	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-29 09:42:45	smtp	10.64.105.225	2236	10.5.71.60	25	1370@hightech.com	1041@hightech.com	会计核算
2017-11-29 09:48:12	smtp	10.64.105.8	2130	10.5.71.60	25	1108@hightech.com	1041@hightech.com	成本控制
2017-11-29 10:13:38	smtp	10.64.105.198	1974	10.5.71.60	25	1467@hightech.com	1041@hightech.com	会计核算
2017-11-29 10:14:55	smtp	10.64.105.235	1901	10.5.71.60	25	1498@hightech.com	1041@hightech.com	会计核算
2017-11-29 10:34:11	smtp	10.64.105.231	2142	10.5.71.60	25	1213@hightech.com	1041@hightech.com	税务
2017-11-29 10:42:17	smtp	10.64.106.30	2096	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-29 10:54:40	smtp	10.64.105.248	1770	10.5.71.60	25	1293@hightech.com	1041@hightech.com	工作汇报
2017-11-29 11:26:03	smtp	10.64.105.88	2333	10.5.71.60	25	1368@hightech.com	1041@hightech.com	税务
2017-11-29 11:41:51	smtp	10.64.105.81	1770	10.5.71.60	25	1327@hightech.com	1041@hightech.com	税务
2017-11-29 11:44:25	smtp	10.64.105.88	2304	10.5.71.60	25	1368@hightech.com	1041@hightech.com	工作汇报
2017-11-29 12:27:38	smtp	10.64.105.198	1977	10.5.71.60	25	1467@hightech.com	1041@hightech.com	税务
2017-11-29 14:01:47	smtp	10.64.105.122	3179	10.5.71.60	25	1186@hightech.com	1041@hightech.com	会计核算
2017-11-29 14:04:42	smtp	10.64.106.23	2599	10.5.71.60	25	1248@hightech.com	1041@hightech.com	资金
2017-11-29 14:07:05	smtp	10.64.106.30	2562	10.5.71.60	25	1137@hightech.com	1041@hightech.com	资金
2017-11-29 14:10:16	smtp	10.64.105.83	2931	10.5.71.60	25	1431@hightech.com	1041@hightech.com	财务分析
2017-11-29 14:15:24	smtp	10.64.105.8	2791	10.5.71.60	25	1108@hightech.com	1041@hightech.com	会计核算
2017-11-29 14:52:27	smtp	10.64.105.231	2891	10.5.71.60	25	1213@hightech.com	1041@hightech.com	工作汇报
2017-11-29 14:54:26	smtp	10.64.105.29	2927	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-29 15:19:01	smtp	10.64.105.71	2764	10.5.71.60	25	1180@hightech.com	1041@hightech.com	税务
2017-11-29 15:38:58	smtp	10.64.105.215	2846	10.5.71.60	25	1346@hightech.com	1041@hightech.com	会计核算
2017-11-29 15:59:09	smtp	10.64.105.83	2938	10.5.71.60	25	1431@hightech.com	1041@hightech.com	税务
2017-11-29 17:00:29	smtp	10.64.105.71	2766	10.5.71.60	25	1180@hightech.com	1041@hightech.com	会计核算
2017-11-29 17:27:29	smtp	10.64.105.90	3130	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-29 17:47:17	smtp	10.64.106.30	2532	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-29 17:48:56	smtp	10.64.105.90	3131	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-29 19:23:26	smtp	10.64.105.43	2500	10.5.71.60	25	1124@hightech.com	1041@hightech.com	会计核算
2017-11-30 04:00:00	smtp	10.1.4.17	49216	10.5.71.60	25	kaoqin@hightech.com	1041@hightech.com	旷工
2017-11-30 09:47:43	smtp	10.64.105.71	2382	10.5.71.60	25	1180@hightech.com	1041@hightech.com	资金
2017-11-30 10:04:40	smtp	10.64.105.71	2381	10.5.71.60	25	1180@hightech.com	1041@hightech.com	资金
2017-11-30 10:37:14	smtp	10.64.105.205	2293	10.5.71.60	25	1255@hightech.com	1041@hightech.com	成本控制
2017-11-30 10:56:51	smtp	10.64.105.235	1742	10.5.71.60	25	1498@hightech.com	1041@hightech.com	工作汇报
2017-11-30 11:15:08	smtp	10.64.105.198	2455	10.5.71.60	25	1467@hightech.com	1041@hightech.com	成本控制
2017-11-30 11:23:07	smtp	10.64.105.225	1973	10.5.71.60	25	1370@hightech.com	1041@hightech.com	资金
2017-11-30 11:55:02	smtp	10.64.105.231	1858	10.5.71.60	25	1213@hightech.com	1041@hightech.com	资金
2017-11-30 12:06:13	smtp	10.64.105.43	2114	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-30 12:12:38	smtp	10.64.105.8	2090	10.5.71.60	25	1108@hightech.com	1041@hightech.com	工作汇报
2017-11-30 12:22:32	smtp	10.64.106.30	2371	10.5.71.60	25	1137@hightech.com	1041@hightech.com	工作汇报
2017-11-30 12:26:24	smtp	10.64.105.12	1967	10.5.71.60	25	1342@hightech.com	1041@hightech.com	资金
2017-11-30 13:35:35	smtp	10.64.106.16	3144	10.5.71.60	25	1347@hightech.com	1041@hightech.com	工作汇报
2017-11-30 14:31:25	smtp	10.64.105.125	1924	10.5.71.60	25	1067@hightech.com	1041@hightech.com	公司发展规划
2017-11-30 14:52:12	smtp	10.64.105.43	2971	10.5.71.60	25	1124@hightech.com	1041@hightech.com	工作汇报
2017-11-30 14:58:55	smtp	10.64.105.248	2804	10.5.71.60	25	1293@hightech.com	1041@hightech.com	财务分析
2017-11-30 15:11:10	smtp	10.64.105.225	2173	10.5.71.60	25	1370@hightech.com	1041@hightech.com	财务分析
2017-11-30 15:29:54	smtp	10.64.105.81	2684	10.5.71.60	25	1327@hightech.com	1041@hightech.com	资金
2017-11-30 15:49:23	smtp	10.64.105.8	2626	10.5.71.60	25	1108@hightech.com	1041@hightech.com	税务
2017-11-30 15:51:00	smtp	10.64.105.15	2513	10.5.71.60	25	1253@hightech.com	1041@hightech.com	税务
2017-11-30 15:53:49	smtp	10.64.105.205	3048	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-30 16:14:08	smtp	10.64.105.205	3052	10.5.71.60	25	1255@hightech.com	1041@hightech.com	会计核算
2017-11-30 16:25:57	smtp	10.64.105.125	1917	10.5.71.60	25	1067@hightech.com	1041@hightech.com	年度计划
2017-11-30 16:40:02	smtp	10.64.105.43	2971	10.5.71.60	25	1124@hightech.com	1041@hightech.com	成本控制
2017-11-30 17:05:10	smtp	10.64.105.90	2904	10.5.71.60	25	1226@hightech.com	1041@hightech.com	工作汇报
2017-11-30 17:37:16	smtp	10.64.105.22	3155	10.5.71.60	25	1439@hightech.com	1041@hightech.com	成本控制
2017-11-30 18:01:41	smtp	10.64.105.29	3199	10.5.71.60	25	1451@hightech.com	1041@hightech.com	工作汇报
2017-11-30 18:16:35	smtp	10.64.105.83	2770	10.5.71.60	25	1431@hightech.com	1041@hightech.com	工作汇报
2017-11-30 18:22:22	smtp	10.64.105.215	2793	10.5.71.60	25	1346@hightech.com	1041@hightech.com	税务
2017-11-30 18:29:38	smtp	10.64.105.231	2606	10.5.71.60	25	1213@hightech.com	1041@hightech.com	成本控制
2017-11-30 19:13:56	smtp	10.64.105.22	3178	10.5.71.60	25	1439@hightech.com	1041@hightech.com	财务分析

可知1041属于财务部门
SELECT distinct `from` FROM betracker.email where `to` = '1041@hightech.com' and `from` regexp '@hightech.com'
再次证明104123个下属和一个直接上司

(以下具体分析不再贴上。)
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