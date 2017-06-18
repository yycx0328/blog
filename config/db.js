/**
 * Created by lyh_o on 2017/5/5.
 */
// 启用mogoose之前启动mongod服务
// cmd -> cd D:\Program Files\MongoDB\Server\3.4\bin -> mongod --dbpath=E:\git\blog\db --port=27017

// mac下启动mongodb：在bin目录下创建mongodb.conf文件,输入以下内容
// port=27017
// dbpath=/usr/local/mongodb/data/
// logpath=/usr/local/mongodb/log/mongodb.log
// fork = true
// 启动mongodb: ./mongod -f mongodb.conf

module.exports = {
    host:'localhost',
    port:27017,
    database:'blog'
}