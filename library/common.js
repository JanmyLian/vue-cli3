/**
 * 判断是否为整数
 */
export const isInteger = (obj) => {
    return typeof obj === 'number' && obj%1 === 0
};
/**
 * 判断是否为对象
 */
export const isObject = (obj) => {
    var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
};

/**
 * 判断对象是否为空
 */
export const checkNullObj = (obj) => {
    return Object.keys(obj).length === 0
}

/**
 * 日期格式转换
 */
export const formatDate = (strTime,type) => {
    const date = new Date(strTime);
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month < 10){
        month = "0"+month;
    }
    if(day < 10){
        day = "0"+day;
    }
    let mydate = date.getFullYear()+"-"+ month +"-"+ day;
    if(type == 'datetime'){
        mydate += " "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }else if(type == 'time'){
        mydate = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
    return mydate;
};

/**
 * 获取前进、后退日期，根据diffDay变量而定
 * @param {*} diffDay 
 * @param {*} fmt 示例：yyyy-MM-dd hh:mm:ss
 * @param {*} defautlTime  标准时间戳
 */
export const getDay = (diffDay,fmt,defautlTime) => {
    const date = defautlTime || new Date();
    if(diffDay){
        date.setDate(date.getDate()+diffDay);//获取diffDay天后的日期
    }
    if(fmt){
        return formatDate(date,fmt);
    }
    return date;
}