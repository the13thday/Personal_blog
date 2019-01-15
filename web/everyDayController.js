let path = new Map();
let everyDayDao = require('../dao/everyDayDao');
let timeUtil = require('../util/timeUtil');

function editEveryDay (request, response) {
    request.on('data', function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.nowTime(), function (res) {
            if (res) {
                response.writeHead(200);
                response.write('数据提交成功');
                response.end();
            }
        })
    });
}

function getEveryDay (request, response) {
    everyDayDao.getEveryDay(function (res) {
        if (res) {
            response.writeHead(200);
            response.write(JSON.stringify(res));
            response.end();
        }
    })
}

path.set('/editEveryDay', editEveryDay);
path.set('/getEveryDay', getEveryDay);

module.exports.path = path;