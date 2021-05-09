
$(function () {
  // 基于准备好的dom，初始化echarts实例
  let myChart_Map = echarts.init(document.getElementById('map'));

  let nowTime = 2000;
  let nowName = 'Barking and Dagenham';

  // 时间轴数据
  let timeLineData = [];
  for (let i in TaxpayerIncome[0]) {
    if (!Number.isNaN(parseInt(i))) {
      timeLineData.push(strToDigital(i));
    }
  }

  let mapData = getDataByYear(TaxpayerIncome, 2000);//地图数据
  let maxDataArr = mapData.map(item => item.value);//地图中的颜色映射数组，为了获取最大值

  let xData = UnemploymentRate.map(item => parseInt(item['Title']));
  let yData = UnemploymentRate.map(item => parseFloat(item['Unemployment rate (aged 16 and over, seasonally adjusted)']));

  let sunChartData = getProfessionalAllByYear(ProfessionalAccountedAll, 2000);
  let pieData = getPieData(ProfessionalAccountedAll, 2000);

  let newsData_1 = newsData.filter(
    item => parseInt(item.year) === 2000
  )

  console.log(getAllTreeMapDataByName(ProfessionalAccounted, 2000));

  let treeData = getTreeMapDataByName(ProfessionalAccounted, 'Barking and Dagenham', 2000);

  //使用timelinechanged 属性 先获取时间轴的索引返回值  再通过索引值获取日期
  myChart_Map.on("timelinechanged", function (timelineIndex) {
    var nowIndex = timelineIndex.currentIndex; //获得时间轴当前选中的索引
    var nowYear = timeLineData[nowIndex];//获取年份
    nowTime = nowYear;
    // 更新地图的数据，动态设置地图的渲染
    mapData = getDataByYear(TaxpayerIncome, nowYear);
    maxDataArr = mapData.map(item => item.value);
    myChart_Map.setOption({
      visualMap: {
        max: Math.max.apply(Math, maxDataArr),
      },
      series: {
        data: mapData
      }
    });

    //更新太阳图
    pieData = getPieData(ProfessionalAccountedAll, nowYear);
    echarts_4(pieData);

    //更新新闻
    newsData_1 = newsData.filter(
      item => parseInt(item.year) === nowYear
    )
    echarts_5(newsData_1[0].title, newsData_1[0].details);

    // 更新树图
    treeData = getTreeMapDataByName(ProfessionalAccounted, nowName, nowTime);
    echarts_1(treeData);
  });

  //使用timelinechanged 属性 先获取时间轴的索引返回值  再通过索引值获取日期
  myChart_Map.on("click", function (params) {
    if (params.componentType === 'series') {
      let clickName = params.name;
      nowName = clickName;
      treeData = getTreeMapDataByName(ProfessionalAccounted, clickName, nowTime);
      echarts_1(treeData);
    } else if (params.componentType === 'timeline') {
      nowTime = strToDigital(params.name);
      // 更新地图的数据，动态设置地图的渲染
      mapData = getDataByYear(TaxpayerIncome, nowTime);
      maxDataArr = mapData.map(item => item.value);
      myChart_Map.setOption({
        visualMap: {
          max: Math.max.apply(Math, maxDataArr),
        },
        series: {
          data: mapData
        }
      });

      //更新太阳图
      pieData = getPieData(ProfessionalAccountedAll, nowTime);
      echarts_4(pieData);

      //更新新闻
      newsData_1 = newsData.filter(
        item => parseInt(item.year) === nowTime
      )
      echarts_5(newsData_1[0].title, newsData_1[0].details);
    }
  })

  echarts_1(treeData);
  echarts_2(xData, yData);
  map(myChart_Map, timeLineData, mapData, maxDataArr);
  echarts_4(pieData);
  echarts_5(newsData_1[0].title, newsData_1[0].details);
})

function titleClick (that) {
  let val = that.innerHTML;
  let xData = [];
  let yData = [];
  if (val === '失业率') {
    $('#echarts_2').css('display', 'block');
    $('#echarts_x').css('display', 'none');
    xData = UnemploymentRate.map(item => parseInt(item['Title']));
    yData = UnemploymentRate.map(item => parseFloat(item['Unemployment rate (aged 16 and over, seasonally adjusted)']));
    echarts_2(xData, yData)
  } else if (val === '可支配收入') {
    $('#echarts_2').css('display', 'block');
    $('#echarts_x').css('display', 'none');
    xData = DisposableIncome.map(item => item['Date']);
    yData = DisposableIncome.map(item => item['London']);
    echarts_2(xData, yData)
  } else if (val === '职业占比') {
    $('#echarts_2').css('display', 'none');
    $('#echarts_x').css('display', 'block');
    let arr = [];
    xData = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
    for (const key in ProfessionalAll) {
      arr.push({
        type: 'line',
        name: key,
        showSymbol: false,
        data: ProfessionalAll[key]
      })
    }
    echarts_x(xData, yData, arr);
  }

}

function echarts_1 (data) {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById('echarts_1'));

  var option = {
    tooltip: {
      formatter: '{b}: {c}',
    },
    color: ['rgb(100,200,300)'],
    series: [
      {
        name: '职业占比',
        type: 'treemap',
        visibleMin: 100,
        data: [data],
        leafDepth: 2,
        levels: [

          {
            colorSaturation: [0.7, 0.3],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.7,
                gapWidth: 5,
                borderWidth: 2,
              },
            },
          },
          {
            colorSaturation: [0.5, 0.3],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.6,
                gapWidth: 1,
              },
            },
          },
          {
            colorSaturation: [0.5, 0.3],
          },
        ],
      },
    ],
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function echarts_2 (xData, yData) {
  let myChart = echarts.init(document.getElementById('echarts_2'));

  option = {
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: Math.min.apply(Math, yData),
      max: Math.max.apply(Math, yData)
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: [{
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        show: false,
      },
      data: xData
    }],
    yAxis: {
      min: Math.min.apply(Math, yData) > 300 ? 350 : 0,
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        interval: 0,
        color: '#fff',
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      top: '10%',
      bottom: '20%',
      left: '10%'
    },
    series: [{
      type: 'line',
      showSymbol: false,
      data: yData
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function echarts_x (xData, yData, series) {
  let myChart = echarts.init(document.getElementById('echarts_x'));

  option = {
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      // max: Math.max.apply(Math, yData)
    },
    tooltip: {
      trigger: 'axis',
      position: ['90%', '-90%']
    },
    xAxis: [{
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        show: false,
      },
      data: xData
    }],
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        interval: 0,
        color: '#fff',
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      top: '10%',
      bottom: '20%',
      left: '10%'
    },
    series: series
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function map (myChart, timeLineData, mapData, maxDataArr) {
  echarts.registerMap('london', mapJSON);

  option = {
    baseOption: {
      timeline: {
        data: timeLineData,
        axisType: 'category',
        autoPlay: false,
        playInterval: 5000, //播放速度
        left: '5%',
        right: '5%',
        bottom: '2%',
        width: '90%',
        //  height: null,
        label: {
          normal: {
            textStyle: {
              color: '#fff',
            }
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        symbolSize: 10,
        lineStyle: {
          color: '#2C7439'
        },
        checkpointStyle: {

          color: '#63FD68',
          symbolSize: 15,
          borderColor: "rgb(107,110,116,0.8)",
          borderWidth: 3.5
        },
        controlStyle: {
          showNextBtn: true,
          showPrevBtn: true,
          normal: {
            color: '#fff',
            borderColor: '#fff'
          },
          emphasis: {
            color: '#63FD68',
            borderColor: '#63FD68'
          }
        },
        emphasis: {
          itemStyle: {
            color: "63FD68"
          }
        }

      },
      title: {
        text: "纳税人收入",
        left: 'center',
        top: '2%',
        textStyle: {
          color: '#fff',
          fontSize: 24
        }
      },
      visualMap: {
        min: 0,
        max: Math.max.apply(Math, maxDataArr),
        right: '5%',
        bottom: '15%',
        text: ['high', 'low'], // 文本，默认为数值文本
        calculable: true,
        inRange: {
          color: ['#6FCF6A', '#FFFD64', '#FF5000']
        },
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        formatter: function (params) {
          return params.name + ": " + params.value
        }
      },
      series: [{
        type: 'map',
        zoom: 1.2,
        mapType: 'london',
        // roam: true,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#3eabff',
            borderColor: '#fff'
          },
          emphasis: {
            areaColor: '#006be4'
          }
        },
        animation: false,
        data: mapData
      }]
    }
  }

  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function echarts_4 (data) {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById('echarts_4'));
  let legendData = [];
  data.parentData.forEach(item => legendData.push(item.name));
  data.childData.forEach(item => legendData.push(item.name));

  // option = {
  //   color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  //   tooltip: {},
  //   series: {
  //     type: 'sunburst',
  //     data: data,
  //     radius: [0, '90%'],
  //     label: {
  //       // show: false,
  //       minAngle: 25,
  //       fontSize: 8,
  //       rotate: 'radial'
  //     }
  //   }
  // };

  option = {
    // color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
      '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5', '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
      '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: '0%',
      width: '40',
      height: '40%',
      top: '55%',
      pageButtonPosition: 'start',
      pageIconColor: '#fff',
      pageTextStyle: {
        color: '#fff'
      },
      data: legendData,
      textStyle: { color: '#fff' },
    },
    series: [
      {
        name: '职业',
        center: ['50%', '30%'],
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          show: false,
          position: 'inner',
          fontSize: 14,
        },
        labelLine: {
          show: false
        },
        data: data.parentData
      },
      {
        name: '职业',
        type: 'pie',
        center: ['50%', '30%'],
        radius: ['45%', '60%'],
        labelLine: {
          show: false,
          length: 30,
        },
        label: {
          show: false,
        },
        data: data.childData
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function echarts_5 (title, details) {
  $('.liMarquee')[0].innerHTML = `<ul>
  <li style="font-size: 24px;margin: 40px 0 10px 0;text-align:center">
    <h1>${title}</h1>
  </li>
  <li style="text-indent:2em;"><span>
  ${details}
    </span></li>
</ul>`;

  $('.liMarquee').liMarquee({
    direction: 'up'
  });

}