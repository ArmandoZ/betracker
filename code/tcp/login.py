# -*- coding: utf-8 -*-
"""
Created on Tue May 22 15:51:46 2018

@author: Minghao Xu
"""

import sys, os
import csv
import json

def main():
    root_file = './data/'
    listing = os.listdir(root_file)
    ip_10_5_71 = 0
    ip_10_63_120 = 0
    proto_1 = []
    proto_2 = []

    source_set = []
    target_set = []
    
    for vid in listing:
        tmp_file = root_file + vid + '/login.csv'
        tmp_csv = csv.reader(open(tmp_file, 'r'))
        tmp_cnt = 0
        for tmp_log in tmp_csv:
            if (tmp_log[6] == 'time'):
                continue
            
            if (tmp_log[1][:9] == '10.63.120'):
                ip_10_63_120 = ip_10_63_120 + 1
            if (tmp_log[1][:7] == '10.5.71'):
                ip_10_5_71 = ip_10_5_71 + 1
                
            if (tmp_log[7] == 'root'):
                print (tmp_cnt)
            
            tmp_cnt = tmp_cnt + 1
            
            if not (tmp_log[0] in proto_1) and (tmp_log[1][:8] == '10.50.50'):
                proto_1.append(tmp_log[0])
                
            if not (tmp_log[0] in proto_2) and (tmp_log[1][:8] == '10.7.133'):
                proto_2.append(tmp_log[0])
                
            # append the source and target ip
            if not (tmp_log[1] in target_set):
                target_set.append(tmp_log[1])
                
            if not (tmp_log[3] in source_set):
                source_set.append(tmp_log[3])
        
        print ('')
                
    # print (ip_10_63_120)
    # print (ip_10_5_71)
    # print (proto_1)
    # print (proto_2)
    
    source_set.sort()
    target_set.sort()
    
    json_dict = {}
    json_dict['source'] = {}
    json_dict['target'] = {}

    source_id = 0
    for tmp_source in source_set:
        json_dict['source'][tmp_source] = source_id
        source_id = source_id + 1

    target_id = 0
    for tmp_target in target_set:
        json_dict['target'][tmp_target] = target_id
        target_id = target_id + 1

    with open("./json/login_ip.json","w") as f:
        json.dump(json_dict, f)
        print("Finish loading the json file!")
    
    print ('source ip: ', source_id)
    print ('target ip: ', target_id)
        
        
main()