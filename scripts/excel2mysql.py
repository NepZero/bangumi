import pandas as pd
import pymysql
from sqlalchemy import create_engine

def excel_to_mysql(excel_file, table_name, db_config):
    """
    将Excel数据导入MySQL数据库
    
    参数:
        excel_file: Excel文件路径
        table_name: 要创建的MySQL表名
        db_config: 数据库连接配置字典
    """
    try:
        # 读取Excel文件
        df = pd.read_excel(excel_file)
        print(f"成功读取Excel文件: {excel_file}")
        print(f"数据预览:\n{df.head()}")

        
        conn=pymysql.connect(host=db_config["host"],user=db_config["user"],passwd=db_config["password"],port=db_config["port"],db=db_config["database"],charset="utf8")
        cursor=conn.cursor()
        print(f"已成功打开MySQL数据库: {db_config["database"]}")

        for i in range(len(df)):
            sql=f"INSERT INTO {table_name} (banguminame,start_time,screening,platform,tag,isfinish,episodes) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            values = (df.at[i,'banguminame'], df.at[i,'start_time'], df.at[i,'screening'] , df.at[i,'platform'], df.at[i,'tag'], df.at[i,'isfinish'], df.at[i,'episodes'])
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
    excel_file = 'data.xlsx'  # 替换为你的Excel文件路径
    table_name = 'season_2024_10'  # 替换为你想要的表名
    
    excel_to_mysql(excel_file, table_name, db_config)