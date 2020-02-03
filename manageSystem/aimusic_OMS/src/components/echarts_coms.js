import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend/scrollableLegendAction';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import {get_c_date} from "../utils/date_utils";

export const show_Line = function (myChart, data) {
    myChart.clear();
    myChart.hideLoading();
    myChart.setOption({
        grid: {
            x: 0, y: 0, x2: 0, y2: 0
        },
        tooltip: {},
        xAxis: {
            boundaryGap: false,
            axisLine: {
                show: false
            },
            data: []
        },
        yAxis: {
            splitLine: false,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                formatter: function () {
                    return "";
                }
            }
        },
        series: [{
            data: data,
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
        }]
    });
};

export const show_day_line_many = function (myChart, data, smooth = true) {
    myChart.clear();
    myChart.hideLoading();
    let series = [];
    let line_data = data.data;
    let legend = data.channels;
    if (line_data === undefined || legend === undefined || line_data.length === 0 || legend.length === 0) {
        return;
    }

    for (let i = 0; i < line_data.length; i++) {
        series.push(
            {
                name: line_data[i].channel,
                type: 'line',
                animation: true,
                smooth: smooth,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 5,
                sampling: 'average',
                // areaStyle: {},
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data[i].data
            }
        )
    }
    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '10%', y: '15%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                animation: true,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            x: 'left',
            data: legend,
            orient: 'vertical', // 'vertical'
        },
        xAxis: [
            {
                type: 'category',
                data: [
                    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
                    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
                    '20:00', '21:00', '22:00', '23:00'
                ].map(function (str) {
                    return str.replace(' ', '\n')
                })
            }
        ],
        yAxis: [
            {
                name: '人数(人)',
                type: 'value',
                minInterval: 1,
                // axisLabel: {
                //     formatter: function (v) {
                //         return parseInt(v)//表示整数。其他数值类型以此类推
                //     }
                // }
            }
        ],
        series: series
    });
};

export const show_date_line_many = function (myChart, data, begin_date, end_date) {
    myChart.clear();
    myChart.hideLoading();
    let series = [];
    let line_data = data.data;
    let legend = data.channels;
    if (line_data === undefined || legend === undefined || line_data.length === 0 || legend.length === 0) {
        return;
    }

    let date_c_list = get_c_date(begin_date, end_date);
    for (let i = 0; i < line_data.length; i++) {
        series.push(
            {
                name: line_data[i].channel,
                type: 'line',
                animation: true,
                smooth: true,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data[i].data
            }
        )
    }

    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                animation: true,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            x: 'left',
            data: legend,
            orient: 'vertical', // 'vertical'
        },
        xAxis: [
            {
                type: 'category',
                data: date_c_list.map(function (str) {
                    return str.replace(' ', '\n')
                })
            }
        ],
        yAxis: [
            {
                name: '人数(人)',
                type: 'value',
                minInterval: 1,
            }
        ],
        series: series
    });
};

export const show_payment_bar_many = function (myChart, data) {
    myChart.clear();
    myChart.hideLoading();
    let series = [];
    let line_data = data.data;
    let legend = data.legends;
    let channels = data.channels;
    if (line_data.length === 0 || legend.length === 0) {
        return;
    }

    for (let i = 0; i < line_data.length; i++) {
        series.push(
            {
                name: line_data[i].legend,
                type: 'bar',
                stack: '总量',
                data: line_data[i].data
            }
        )
    }

    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: legend
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: channels
        },
        series: series
    });
};

export const show_area = function (myChart, data) {
    let legend = data.legends;
    myChart.setOption(
        {
            title: {
                text: '',
                subtext: '',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'left',
                orient: 'vertical',
                data: legend
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data: data.data
                }
            ]
        }
    )
};

export const show_course_bar = function (myChart, data, smooth = true) {
    myChart.clear();
    myChart.hideLoading();
    var series = [];
    var line_data = data.data.reverse();
    var label_list = [];
    var line_data_1 = [];
    var line_data_2 = [];
    var line_data_3 = [];
    for (let i = 0; i < line_data.length; i++) {
        line_data_1.push(line_data[i].study_count);
        line_data_2.push(line_data[i].complete_count);
        line_data_3.push(line_data[i].study_buy_count);
        let name = line_data[i].name;
        if (line_data[i].experience === '*体验课程*') {
            name = name + '（*体验课程*）';
        }
        label_list.push(name);
    }
    series.push({
        name: '学习人数',
        type: 'bar',
        barGap: 0,
        label: {
            normal: {
                show: true,
                position: 'inside'
            }
        },
        data: line_data_1
    });
    series.push({
        name: '完成人数',
        type: 'bar',
        barGap: 0,
        label: {
            normal: {
                show: true,
                position: 'inside'
            }
        },
        data: line_data_2
    });
    series.push({
        name: 'app购买人数',
        type: 'bar',
        barGap: 0,
        label: {
            normal: {
                show: true,
                position: 'inside'
            }
        },
        data: line_data_3
    });
    myChart.setOption({
        color: ['#4cabce', '#e5323e'],
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['学习人数', '完成人数', 'app购买人数']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'top',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: label_list,
            }
        ],
        xAxis: [
            {
                type: 'value',
                minInterval: 1,
            }
        ],
        series: series
    });
};

export const show_course_bar_2 = function (myChart, data, smooth = true) {
    myChart.clear();
    myChart.hideLoading();
    var series = [];
    var line_data = data.data.reverse();
    var label_list = [];
    var line_data_3 = [];
    for (let i = 0; i < line_data.length; i++) {
        line_data_3.push(line_data[i].study_buy_count);
        let name = line_data[i].name;
        if (line_data[i].experience === '*体验课程*') {
            name = name + '（*体验课程*）';
        }
        label_list.push(name);
    }
    series.push({
        name: '已购买学习人数',
        type: 'bar',
        barGap: 0,
        label: {
            normal: {
                show: true,
                position: 'inside'
            }
        },
        data: line_data_3
    });
    myChart.setOption({
        color: ['#4cabce', '#e5323e'],
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['已购买学习人数']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'top',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: label_list,
            }
        ],
        xAxis: [
            {
                type: 'value',
                minInterval: 1,
            }
        ],
        series: series
    });
};

export const show_material_bar = function (myChart, data, smooth = true) {
    myChart.clear();
    myChart.hideLoading();
    var series = [];
    var line_data = data.data;
    var label_list = [];
    var data_list = [];
    for (let i = 0; i < line_data.length; i++) {
        label_list.push(line_data[i].total);
        data_list.push(line_data[i].title);
    }
    series.push({
        name: '数目',
        type: 'bar',
        barGap: 0,
        label: {
            normal: {
                show: true,
                position: 'inside'
            }
        },
        itemStyle: {
            emphasis: {
                barBorderRadius: 7
            },
            normal: {
                barBorderRadius: 7
            }
        },
        data: data_list
    });
    myChart.setOption({
        color: ['#4cabce', '#e5323e'],
        grid: {
            x: '10%', y: '10%', x2: '10%', y2: '10%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['数目']
        },
        toolbox: {
            show: true,
            left: 'top',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        yAxis: [
            {
                type: 'value',
                axisTick: {show: false},
                data: label_list,
            }
        ],
        xAxis: [
            {
                type: 'category',
                minInterval: 1,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: series
    });
};

export const show_lesson_bar = function (myChart, data, smooth = true) {
    myChart.clear();
    myChart.hideLoading();
    var line_data = data;
    var guitar_data = line_data.guitar_data;
    var uk_data = line_data.uk_data;
    var ka_data = line_data.ka_data;
    var fei_data = line_data.fei_data;
    var piano_data = line_data.piano_data;
    myChart.setOption({
        grid: {
            x: '10%', y: '10%', x2: '10%', y2: '10%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['吉他', '尤克里里', '卡林巴', '非洲鼓', '钢琴']
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '数目',
                min: 0,
                axisLabel: {
                    formatter: '{value} 人'
                }
            }
        ],
        series: [
            {
                name: '吉他',
                type: 'bar',
                data: guitar_data
            },
            {
                name: '尤克里里',
                type: 'bar',
                data: uk_data
            },
            {
                name: '卡林巴',
                type: 'bar',
                data: ka_data
            },
            {
                name: '非洲鼓',
                type: 'bar',
                data: fei_data
            },
            {
                name: '钢琴',
                type: 'bar',
                data: piano_data
            }
        ]
    });
};


export const show_date_share_many = function (myChart, data, begin_date, end_date) {
    myChart.clear();
    myChart.hideLoading();
    let line_data = data;
    let legend = ['点击量', '注册人数', '购买订单量', '购买人数', '购买金额'];
    if (line_data === undefined || legend === undefined || line_data.length === 0 || legend.length === 0) {
        return;
    }

    let date_c_list = get_c_date(begin_date, end_date);
    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                animation: true,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            x: 'left',
            data: legend,
            orient: 'vertical', // 'vertical'
        },
        xAxis: [
            {
                type: 'category',
                data: date_c_list.map(function (str) {
                    return str.replace(' ', '\n')
                })
            }
        ],
        yAxis: [
            {
                name: '人数(人)',
                type: 'value',
                minInterval: 1,
            }
        ],
        series: [
            {
                name: '点击量',
                type: 'line',
                animation: true,
                smooth: true,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data.install_cnt_list,
            },
            {
                name: '注册人数',
                type: 'line',
                animation: true,
                smooth: true,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data.reg_list
            },
            {
                name: '购买订单量',
                type: 'line',
                animation: true,
                smooth: true,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data.pay_total_list
            },
            {
                name: '购买人数',
                type: 'line',
                animation: true,
                smooth: true,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data.pay_number_list
            },
            {
                name: '购买金额',
                type: 'line',
                animation: true,
                smooth: true,
                lineStyle: {
                    width: 2
                },
                // symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: line_data.pay_amount_list
            }
        ]
    });
};


export const show_date_share_funnel = function (myChart, data, begin_date, end_date) {
    myChart.clear();
    myChart.hideLoading();
    let line_data = data.data;
    let legend = data.legend;
    if (line_data === undefined || legend === undefined || line_data.length === 0 || legend.length === 0) {
        return;
    }
    let seriesLabel = {
        normal: {
            show: true,
            textBorderColor: '#ffffff',
        }
    };

    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                animation: true,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            x: 'left',
            data: legend,
            orient: 'vertical', // 'vertical'
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: [
            {
                name: '',
                type: 'category',
                minInterval: 1,
                data: legend
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                label: seriesLabel,
                data: line_data
            },
        ]
    });
};


export const show_channel_dui = function (myChart, data, begin_date, end_date) {
    myChart.clear();
    myChart.hideLoading();
    let line_data = data.data;
    let legend = data.legend;
    let series = [];

    if (line_data === undefined || legend === undefined || line_data.length === 0 || legend.length === 0) {
        return;
    }

    let we_list = [];
    let wen_list = [];
    let ad_list = [];
    let mei_list = [];
    let dd_list = [];
    let other_list = [];

    for (let i = 0; i < line_data.length; i++) {
        we_list.push(line_data[i].we_count);
        wen_list.push(line_data[i].wen_count);
        ad_list.push(line_data[i].ad_count);
        mei_list.push(line_data[i].mei_count);
        dd_list.push(line_data[i].dd_count);
        other_list.push(line_data[i].other_count);
    }
    series.push({
        name: '威伯',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: we_list
    });
    series.push({
        name: '安德鲁',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: ad_list
    });
    series.push({
        name: '文思特',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: wen_list
    });
    series.push({
        name: '美音',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: mei_list
    });
    series.push({
        name: '哆哆咪',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: dd_list
    });
    series.push({
        name: '其他',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: other_list
    });

    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '10%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
        },
        legend: {
            data: ['威伯', '安德鲁', '文思特', '美音', '哆哆咪', '其他'],
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: legend
        },
        series: series
    });
};


export const show_channel_dui_2 = function (myChart, data, begin_date, end_date) {
    myChart.clear();
    myChart.hideLoading();
    let line_data = data.data;
    let legend = data.legend;
    let series = [];

    if (line_data === undefined || legend === undefined || line_data.length === 0 || legend.length === 0) {
        return;
    }

    let aa = [];
    let show_legend = ['威伯', '安德鲁', '文思特', '美音', '哆哆咪', '其他'];

    for (let i = 0; i < line_data.length; i++) {
        let bb = [];
        bb.push(line_data[i]['we_count'] | 0);
        bb.push(line_data[i]['ad_count'] | 0);
        bb.push(line_data[i]['wen_count'] | 0);
        bb.push(line_data[i]['mei_count'] | 0);
        bb.push(line_data[i]['dd_count'] | 0);
        bb.push(line_data[i]['other_count'] | 0);
        aa.push(bb);
    }

    for (let i = 0; i < aa.length; i++){
      series.push({
        name: legend[i],
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: aa[i]
    });
    }

    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '25%', y: '10%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
        },
        legend: {
            data: legend,
            x: 'left',
            orient: 'vertical', // 'vertical'
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: show_legend
        },
        series: series
    });
};

export const show_dashboard_total = function (myChart, data, x_name, y_name, legend) {
    myChart.clear();
    myChart.hideLoading();
    let series = [];
    let xAxis = [];
    let color = ['#c6443d', '#2e65c6', '#8ec6ad', '#c660b0', '#FFAEB9', '#CCCCCC', '#8968CD', '#7FFFD4', '#00FF7F', '#B4EEB4', '#BCEE68'];

    for (let i = 0; i < data.length; i++) {
        series.push(
            {
                name: data[i].name,
                data: data[i].data_list,
                type: 'line',
                snap: true,
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[i]
                        }])
                    }
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        );
        xAxis.push(
            {
                type: 'category',
                data: data[i].labels,
            }
        )
    }

    myChart.setOption({
        title: {
            text: '',
            subtext: '',
        },
        grid: {
            x: '2%', y: '15%', x2: 0, y2: 0,
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                animation: true,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            x: 'left',
            data: legend,
            orient: 'vertical', // 'vertical'
        },
        xAxis: xAxis,
        yAxis: [
            {
                name: y_name,
                type: 'value',
                minInterval: 1,
            }
        ],
        series: series,
    });
};

export const show_pie = function (myChart, data, title) {
    myChart.clear();
    myChart.hideLoading();
    var labels = data['labels'].slice(0, 20);
    var data_list = data['ret_query'].slice(0, 20);

    myChart.setOption({
        title : {
            text: title,
            subtext: '分布',
            x:'center'
        },
        grid: {
            x: '10%', y: '2%', x2: '10%', y2: '2%',
            containLabel: true
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: labels
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius : '70%',
                center: ['60%', '50%'],
                data: data_list,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
};
