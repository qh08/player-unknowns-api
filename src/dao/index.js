const MongoClient = require('mongodb').MongoClient;
const CONSTANT = require('./constant');
const dataBase = require('../../config').db;
const URL = `mongodb://${dataBase.username}:${dataBase.password}@${dataBase.ip}:${dataBase.port}/admin`;


async function getMongo() {
    return await MongoClient.connect(URL);
}

module.exports = {
    /**
     * @param [Object] userInfo {userName,userId}
     * @param [String] server
     * @param [String] mode
     * @param [String] queueSize
     * @param [Object] timeRange {from, to}
     * @param [Object] paginationConfiguration {pageNum,limit}
     * @returns 
     */
    getBattles: async function (userInfo, server, mode , queueSize, timeRange, pageConfig) {
        try {
            const client = await getMongo();
            const pubgee = client.db(CONSTANT.PUBGEE);
            const findDetail = {
                userId: userInfo.userId,
                server,
                mode,
                'queue_size':queueSize
            };
            const sortWay = {
                started_at: -1
            };
            console.log(findDetail);
            const results = await pubgee.collection(CONSTANT.BATTLE)
                                        .find(findDetail)
                                        .sort(sortWay)
                                        .toArray();
            client.close();
            return results;
        } catch (error) {
            throw new Error(error.stack);
        }
    },
}

module.exports.getBattles;