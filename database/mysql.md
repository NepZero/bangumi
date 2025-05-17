# MysqlWorkbench使用

## 1.导出数据库
点击左边Administration->Data Export

## 2.导入数据
点击左边Administration->Data Import
(导入时出现错误,诸如 ERROR 1049 (42000): Unknown database 'db1',这是因为找不到相应数据库,先创建对应数据库)

# Mysql常用语句
## 数据表操作
**重置表:** truncate table 表名
**符合约束:** ALTER TABLE 表名 ADD CONSTRAINT 约束名称 UNIQUE (列1, 列2)

## 数据操作
**删除数据:** DELETE FROM 数据表名称 WHERE 删除条件
**更新数据:** UPDATE 数据表名称 SET 字段1=新值1, 字段2=新值2 WHERE 更新条件
**插入数据:** INSERT INTO 数据表名称 (字段1, 字段2, ...) VALUES (值1, 值2, ...)