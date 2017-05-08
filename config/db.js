/**
 * Created by lyh_o on 2017/5/5.
 */
// 启用mogoose之前启动mongod服务
// cmd -> cd D:\Program Files\MongoDB\Server\3.4\bin -> mongod --dbpath=E:\git\blog\db --port=27017

module.exports = {
    host:'localhost',
    port:27017,
    database:'blog'
}