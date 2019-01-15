function writeResult (status, msg, data) {  // like 'success' '成功' 'data'
    return JSON.stringify({status, msg, data});
}

module.exports.writeResult = writeResult;