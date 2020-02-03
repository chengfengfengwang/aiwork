export const get_c_date = function(start_date, end_date) {
    function getDate(str_date, split_str = '-') {
        let temp = str_date.split(split_str);
        return new Date(parseInt(temp[0]), parseInt(temp[1]) - 1, parseInt(temp[2]));
    }

    let startTime = getDate(start_date);
    let endTime = getDate(end_date);

    let c_list = [];
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        let month = startTime.getMonth().toString().length === 1 ? "0" + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1);
        let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
        c_list.push(startTime.getFullYear() + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
    }

    return c_list;
};