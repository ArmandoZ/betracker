# -*- coding: utf-8 -*-
"""
Created on Tue May 29 15:25:25 2018

@author: Minghao Xu
"""

import os, sys
import json
import csv
import numpy as np

len_set = [52522, 51401, 52243, 768, 2642, 51540, 51457, 52796, 51369, 50054, 
           2998, 3473, 53238, 54031, 53203, 53468, 52922, 4612, 4800, 51635, 
           52032, 53156, 54117, 52754, 5318, 4707, 51076, 52796, 51468, 51222]

def get_sorted_list():
    root_file = './data/'
    listing = os.listdir(root_file)
    
    json_dict = {}
    list_id = 0
    
    for vid in listing:
        tmp_file = root_file + vid + '/tcpLog.csv'
        tmp_csv = csv.reader(open(tmp_file, 'r'))
        
        tmp_list_up = np.zeros((len_set[list_id], 2))
        tmp_list_down = np.zeros((len_set[list_id], 2))
        tmp_cnt = 0
        
        for tmp_log in tmp_csv:
            if (tmp_log[2] == "proto"):
                continue
            
            tmp_up = int(tmp_log[7])
            tmp_down = int(tmp_log[8])
            
            tmp_list_up[tmp_cnt][1] = tmp_up
            tmp_list_up[tmp_cnt][0] = tmp_cnt
            tmp_list_down[tmp_cnt][1] = tmp_down
            tmp_list_down[tmp_cnt][0] = tmp_cnt
            
            tmp_cnt = tmp_cnt + 1
            
            '''if not (tmp_up in up_set):
                up_set.append(tmp_up)
                
            if not (tmp_down in down_set):
                down_set.append(tmp_down)'''
                
        sorted_list_up = tmp_list_up[np.lexsort(-tmp_list_up.T)]
        sorted_list_down = tmp_list_down[np.lexsort(-tmp_list_down.T)]
                                         
        json_dict[vid] = {}
        json_dict[vid]["up"] = sorted_list_up.tolist()
        json_dict[vid]["down"] = sorted_list_down.tolist()
                                         
        print ("up: ", sorted_list_up.shape)
        print (sorted_list_up.tolist()[:5])
        print ("down: ", sorted_list_down.shape)
        print (sorted_list_down.tolist()[:5])
                
        list_id = list_id + 1
        
    with open("./json/tcp_sort.json","w") as f:
        json.dump(json_dict, f)
        print("Finish loading the json file!")

def get_info_list():
    root_file = './data/'
    listing = os.listdir(root_file)
    
    json_dict = {}
    
    for vid in listing:
        tmp_file = root_file + vid + '/tcpLog.csv'
        tmp_csv = csv.reader(open(tmp_file, 'r'))
        
        json_dict[vid] = {}

        for i in range(24):
            # initailize the time intervals in a day
            tmp_interval_1 = str(i).zfill(2) + ":00-" + str(i).zfill(2) + ":30"
            json_dict[vid][tmp_interval_1] = []
            tmp_interval_2 = str(i).zfill(2) + ":30-" + str(i+1).zfill(2) + ":00"
            json_dict[vid][tmp_interval_2] = []

            # append items to corresponding time intervals
            min_1 = i * 60 
            max_1 = i * 60 + 30
            min_2 = i * 60 + 30
            max_2 = (i + 1) * 60
        
            for tmp_log in tmp_csv:
                if (tmp_log[2] == "proto"):
                    continue
            
                tmp_time = tmp_log[0].split(' ')[1]
                tmp_hour = int(tmp_time.split(':')[0])
                tmp_min = int(tmp_time.split(':')[1])
                tmp_sum = tmp_hour * 60 + tmp_min 
                
                tmp_tuple = (tmp_log[0], tmp_log[1], tmp_log[5], tmp_log[3], tmp_log[7], 
                             tmp_log[8], tmp_log[2])
                
                if (tmp_sum < min_1):
                    continue
                
                if (tmp_sum >= min_1 and tmp_sum < max_1):
                    json_dict[vid][tmp_interval_1].append(tmp_tuple)   
                
                if (tmp_sum >= min_2 and tmp_sum < max_2):
                    json_dict[vid][tmp_interval_2].append(tmp_tuple)
                    
                if (tmp_sum >= max_2):
                    break
                
        print (vid)
        
    with open("./json/tcp_info.json","w") as f:
        json.dump(json_dict, f)
        print("Finish loading the json file!")
        
def main():
    get_info_list()
        

main()