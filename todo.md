# 信息分析（详见docs/pre-analysis)
## login
用户-sip近似一一对应，一个用户可能在多个sip登陆  
## weblog
大部分的访问集中在一些网站  
周末/非周末分布不一样：非周末分布更集中->（在周末访问这些网站的人，是什么样的人呢？）  
## tcp
不同协议(ssh, ftp, sql等)  
连接次数分布不均匀  
## email
sip-email一一对应（？）  
## checking
时间分布  

# 题目思路

## 题目1

1. 部门
部门只有财务、人力资源和研发三种，邮件标题语义较清晰，初步采用手动通过关键词筛选的方法。	
排除特殊邮箱  
	work@hightech.com  
	allstaff@hightech.com  
	notice@hightech.com  
	kaoqin@hightech.com  
关键词  
	财务：  
		财务  
		...  
	人力资源：  
		面试  
		简历  
		...  
	研发：  
		测试  
		脚本  
		软件  
		概要设计  
		详细设计  
		ALARM  
		RECOVER  
		...  

2. 组织架构  
上下级：邮件往来的连接强弱（拓扑结构）  
	只要内网的邮件  



## 题目2  

1. 正常工作模式  

	确定每种数据的指标/可视化方式：    
		checking   
			上班，下班时间   
			一周上班天数   
			工作时长   
		login时间   
 			** TODO minghao xu **     
		网页访问&频次   
			top visited sites
			** TODO yuheng zhi **   
		email主题(TODO 下次讨论)   
			收发时间   
			主题关键词   
				wordcloud   
				每个人特殊的词   
		tcp(TODO 下次讨论)   
			各个sql访问时间   

## TODO
1. [第一题] 邮件的分类(jack sun & sen li)  
		交付：  
		-> 每个邮件的类型(engineering, finance, hr, junk, undeternimed等等)，可以在email.csv添加一列？
		-> 大概每个人的部门(四个user id的list，第四个list是不确定的)  
2. [第一题] 邮件拓扑结构(jack sun & sen li)    	
		交付：  
		-> 能看的图  
		再说     
3. [第二题] 出每种数据的简单可视化结果(yuheng zhi & minghao xu & zhaoguo zhu)     
		交付：  
		-> 根据上述指标/可视化方式，画出简单的分布图(能看就行，建议matlab)
		zzg checkin-out   
		xmh login   
		zyh weblog   
