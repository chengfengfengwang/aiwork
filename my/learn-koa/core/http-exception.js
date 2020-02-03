class HttpException extends Error{
    constructor(errorCode=10000,errMsg='出错了',code=400){
        super();
        this.errorCode = errorCode;
        this.errMsg = errMsg;
        this.code = code
    }
}
module.exports = HttpException