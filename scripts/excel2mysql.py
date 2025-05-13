import pandas as pd
import numpy as np
import pymysql
from sqlalchemy import create_engine

def excel_to_mysql(excel_file, table_name, db_config,sheet=''):
    """
    将Excel数据导入MySQL数据库
    
    参数:
        excel_file: Excel文件路径
        table_name: 要创建的MySQL表名
        db_config: 数据库连接配置字典
    """
    try:
        # 读取Excel文件
        if sheet:
            df=pd.read_excel(excel_file,sheet_name=sheet)
            print(f"成功读取Excel文件: {excel_file}")
        else:
            df = pd.read_excel(excel_file)
            print(f"成功读取Excel文件: {excel_file}.{sheet}")
        print(f"数据预览:\n{df}")

        
        conn=pymysql.connect(host=db_config["host"],user=db_config["user"],passwd=db_config["password"],port=db_config["port"],db=db_config["database"],charset="utf8")
        cursor=conn.cursor()
        print(f"已成功打开MySQL数据库: {db_config["database"]}")

        for i in range(len(df)):
            if df.at[i,'platform'] is np.nan:
                df.at[i,'platform']='暂无'  #处理空值情况
            if pd.isna(df.at[i,'episodes']):
                df.at[i,'episodes']=0   #0-未知 -1-长期连载
            
            sql=f"INSERT INTO {table_name} (banguminame,start_time,screening,platform,isfinish,episodes,season) VALUES (%s, %s, %s, %s, %s, %s,%s)"
            values = (df.at[i,'banguminame'], df.at[i,'start_time'], df.at[i,'screening'] , df.at[i,'platform'], df.at[i,'isfinish'], df.at[i,'episodes'],df.at[i,'season'])
            cursor.execute(sql, values)

            sql=f'select id from {table_name} where banguminame="{df.at[i,'banguminame']}"'
            cursor.execute(sql)
            id=cursor.fetchone()[0]
            sql=f"INSERT INTO season_info (banguminame,id,season) VALUES (%s, %s, %s)"
            values=(df.at[i,'banguminame'],id,df.at[i,'season'])
            cursor.execute(sql, values)

            tags=df.at[i,'tag'].split('/')
            for tag in tags:
                sql=f"INSERT INTO tag_info (banguminame,id,tag) VALUES (%s, %s, %s)"
                values=(df.at[i,'banguminame'],id,tag)
                cursor.execute(sql, values)

        conn.commit()
        print(f"insert {len(df)} data")

        cursor.close()  # 关闭游标
        conn.close()    # 关闭连接
        
    except Exception as e:
        print(f"发生错误: {str(e)}")

# 数据库配置
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '123456',
    'database': 'bangumi',
    'port': 3306,
}

# 使用示例
if __name__ == "__main__":
    excel_file = '../../2025年4月新番表v4.0 byHazx.xlsx'  # 替换为你的Excel文件路径
    table_name = 'bangumi_info'  # 替换为你想要的表名
    sheet_name='Sheet1'
    excel_to_mysql(excel_file, table_name, db_config,sheet_name)
    # df=pd.read_excel(excel_file,sheet_name=sheet_name)
    # print(df)
