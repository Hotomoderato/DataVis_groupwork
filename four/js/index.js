// 柱状图模块1
(function() {
  // 1实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 2. 指定配置项和数据
  var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['WellBeingScore', 'Happiness', 'Anxiety'],
        itemWidth: 5,
        itemHeight: 5,
        itemGap: 5,
        textStyle: { 
        fontSize: 12,
        color: '#F1F1F3'
        }
    },
    grid: {
        left: '0%',
        right: '5%',
        top: '11%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'value',
            axisLabel:{
                textStyle:{
                  color: "white"
                }
              },
        }
    ],
    yAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            axisLabel:{
                textStyle:{
                  color: "white"
                }
              },
        }
    ],
    series: [
        {
            name: 'WellBeingScore',
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            emphasis: {
                focus: 'series'
            },
            data: [4.16, 4.27, 4.47, 4.6, 4.61, 4.61, 4.63, 4.69]
        },
        {
            name: 'Happiness',
            type: 'bar',
            stack: '总量',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [7.29, 7.30, 7.39, 7.46, 7.48, 7.51, 7.52, 7.56]
        },
        {
            name: 'Anxiety',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'left'
            },
            emphasis: {
                focus: 'series'
            },
            data: [-3.13, -3.03, -2.92, -2.86, -2.87, -2.90, -2.89, -2.87]
        }
    ]
};
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();




// 柱状图2
(function() {
  // 1实例化对象
  var myChart = echarts.init(document.querySelector(".bar2 .chart"));
  // 2. 指定配置项和数据
  var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#199'
            }
        }
    },
    toolbox: {
        feature: {
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
        }
    },
    legend: {
        data: ['Number', 'Percentage'],
        itemWidth: 5,
        itemHeight: 5,
        itemGap: 5,
        textStyle: { 
        fontSize: 12,
        color: '#F1F1F3'
        }
    },
       
    grid: {
        left: '0%',
        right: '0%',
        top: '11%',
        bottom: '0%',
        containLabel: true
    },
           
    xAxis: [
        {
            type: 'category',
            data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel:{//修改坐标系字体颜色
                textStyle:{
                    color: "white"
                }
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            //name: 'people',
            min: 350000,
            max: 550000,
            interval: 25000,
            axisLabel: {
                formatter: '{value}',
                textStyle:{
                    color: "white"
                }
            }
        },
        {
            type: 'value',
            // name: 'Percentage',
            min: 60,
            max: 70,
            interval: 2,
            axisLabel: {
                formatter: '{value} %',
                textStyle:{
                    color: "white"
                }
            }
        }
    ],
    series: [
        {
            name: 'Number',
            type: 'bar',
            data: [432806, 447864, 460214 , 462869, 475253, 496501, 514714, 528681, 529812]
        },

        {
            name: 'Percentage',
            type: 'line',
            yAxisIndex: 1,
            data: [68.9, 69.3, 68.6, 68.9, 68.3, 69.3, 69.4, 69.3, 67.4]
        }
    ]
};
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();






// 线图1
(function() {
  // 1实例化对象
  var myChart = echarts.init(document.querySelector(".line .chart"));
  // 2. 指定配置项和数据
  var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Fatal', 'Serious', 'Slight', 'Total'],
        itemWidth: 5,
        itemHeight: 5,
        itemGap: 5,
        textStyle: { 
        fontSize: 12,
        color: '#F1F1F3'
        }
    },
    toolbox: {
        feature: {
            }
    },
      grid: {
        left: '0%',
        right: '5%',
        top: '11%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            axisLabel: {
                textStyle:{
                    color: "white"
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                textStyle:{
                    color: "white"
                }
            }
        }
    ],
    series: [
        {
            name: 'Fatal',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [159, 135, 133, 129, 136, 116, 131, 112]
        },
        {
            name: 'Serious',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [2651, 2887,2194,2041,1956, 2385, 3750, 3953]
        },
        {
            name: 'Slight',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [26481, 25800,24911,28667,28090, 27769, 28686,26526]
        },

        {
            name: 'Total',
            type: 'line',
            stack: '总量',
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [29291, 28822, 27238, 30837, 30182, 30270,32567,30591]
        }
    ]
};
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();



// 饼图
(function() {
  // 1实例化对象
  var myChart = echarts.init(document.querySelector(".line2 .chart"));
  // 2. 指定配置项和数据
  var option = {
    legend: {
        top: 'bottom',
        itemWidth: 5,
        itemHeight: 5,
        itemGap: 5,
        textStyle: { 
            fontSize: 12,
            color: '#F1F1F3'
        }
    },
    
 
    toolbox: {
    show: true,
    feature: {
    mark: {show: true},
    restore: {show: true},
        }
    },
    series: [
        {
            name: 'pie',
            type: 'pie',
            radius: [50, 120],
            center: ['50%', '35%'],
            roseType: 'area',
            itemStyle: {
            borderRadius: 12
            },
            "label": {
                "normal": {
                    "show": true,
                    "textStyle": {
                    "fontSize": 10 }
                        }
            },
            labelLine: {
								normal: {
									lineStyle: {
										color: 'rgba(255, 255, 255, 0.6)'
									},
									smooth: 0.5,
									length: 1,
									length2: 1,
								}
							},

            data: [
                {value: 2130, name: '0 to 9'},
                {value: 2668, name: '10 to 19'},
                {value: 7719, name: '20 to 29'},
                {value: 7097, name: '30 to 39'},
                {value: 4850, name: '40 to 49'},
                {value: 3403, name: '50 to 59'},
                {value: 1356, name: '60 to 69'},
                {value: 1368, name: '70 to 79+'}
             
            ]
        }
    ]
};
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
