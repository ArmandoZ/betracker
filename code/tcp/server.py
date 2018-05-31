# -*- coding: utf-8 -*-
"""
Created on Mon May 28 11:50:03 2018

@author:Minghao Xu
"""

import os, sys
import json
import time
import csv

def main():
    root_file = './data/'
    listing = os.listdir(root_file)
    
    json_dict = {}
    
    for vid in listing:
        tmp_file = root_file + vid + '/login.csv'
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
                if (tmp_log[6] == 'time'):
                    continue
                
                tmp_time = tmp_log[6].split(' ')[1]
                tmp_hour = int(tmp_time.split(':')[0])
                tmp_min = int(tmp_time.split(':')[1])
                tmp_sum = tmp_hour * 60 + tmp_min
                tmp_tuple = (tmp_log[3], tmp_log[1], tmp_log[5], tmp_log[7], tmp_log[6])
                
                if (tmp_sum < min_1):
                    continue
                
                if (tmp_sum >= min_1 and tmp_sum < max_1):
                    json_dict[vid][tmp_interval_1].append(tmp_tuple)   
                
                if (tmp_sum >= min_2 and tmp_sum < max_2):
                    json_dict[vid][tmp_interval_2].append(tmp_tuple)
                    
                if (tmp_sum >= max_2):
                    break
                
    with open("./json/login_record.json","w") as f:
        json.dump(json_dict, f)
        print("Finish loading the json file!")
        
            
main()
