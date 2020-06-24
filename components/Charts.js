/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts全量引入，没有按需
 */

import echarts from 'echarts'
const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                smooth: true
                            }]
                        };

                        this.chart.setOption(optionData);
                        this.chart.resize();
                    },
                    colors(type){
                        let colors = []
                        if(type === 'lines'){
                            colors = ['#0092fe', '#EF6B6B']
                        }else if(type === 'bars'){
                            colors = ['#5DA1E5', '#E6A23C']
                        }
                        return colors
                    },
                    // 多条线性图
                    lines(id, params){
                        let {xAxis, legend, series} = {...params}
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        const optionData = this.handleOption(xAxis, legend, series, 'lines');
                        this.chart.setOption(optionData);
                        this.chart.resize();
                    },
                    // 多条柱状图
                    bars(id, params) {
                        let {xAxis, legend, series} = {...params}
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = this.handleOption(xAxis, legend, series, 'bars');

                        this.chart.setOption(optionData);
                        this.chart.resize();
                    },
                    handleOption(xAxis, legend, series, type){
                        const optionData = {
                            color: this.colors(type),
                            tooltip : {
                                trigger: 'axis',
                                formatter:function(params)  
                                {  
                                    let relVal = params[0].name;
                                    for(let i in params){
                                        let val = params[i].value;
                                        if (val >=10000) {
                                            val = (Math.floor( val ) / 10000).toFixed(2) +'万';
                                        }else if(val <10000){
                                            val = val;
                                        }
                                        relVal += '<br/>' + params[i].seriesName + ' : ' + val;
                                    }
                                    return relVal;  
                                }
                            },
                            legend: {
                                data: legend || [],
                                top: 0,
                                left: 0,
                                height: 41,
                                padding: [2, 0],
                                itemWidth: 12,
                                itemHeight: 4,
                                itemGap: 20,
                                textStyle:{
                                    fontSize: 14
                                }
                            },
                            grid: {
                                left: type === 'lines'?'2%':0,
                                right: type === 'lines'?'4%':0,
                                top: 40,
                                bottom:0,
                                containLabel: true,
                                tooltip:{
                                    axisPointer:{
                                        lineStyle:{
                                            color: '#EDF1F2',
                                        }
                                    }
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap : type === 'lines'?false:true,
                                data: xAxis || [],
                                axisPointer: {
                                    type: 'shadow'
                                },
                                axisLabel: {
                                    margin: 20,
                                    textStyle: {
                                        color: '#989A9E'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#EDF1F2'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                //网格样式
                                splitLine: {
                                    show: false
                                }
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    margin: 20,
                                    color: '#989A9E',
                                    formatter: function(value,index){
                                        var value;
                                        if (value >=10000) {
                                            value = value/10000+'万';
                                        }else if(value <10000){
                                            value = value;
                                        }
                                        return value
                                    }
                                },
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                //网格样式
                                splitLine: {
                                    show: true,
                                    lineStyle:{
                                        color: ['#EDF1F2'],
                                        width: 1,
                                        type: 'solid'
                                    }
                                },
                            },
                            series: series || []
                        };

                        return optionData;
                    },
                }
            }
        }
    })
}

export default {
    install
}