function nowTime () {
    return Math.round(Date.now() / 1000);
}

function add0 (num) {
    return num < 10 ? '0' + num : num;
}

function format(time) {
    time = parseInt(time + '000');
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return year + '-' + add0(month) + '-' + add0(day) + ' '+ add0(hours) + ':' + add0(minutes);
}

module.exports.nowTime = nowTime;
module.exports.format = format;