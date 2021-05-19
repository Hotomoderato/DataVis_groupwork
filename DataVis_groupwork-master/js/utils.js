/**
 * 带有逗号的数字或者字符串数据转换为Number类型
 * @param {String} str 
 * @returns 
 */
let strToDigital = function (str) {
  return str.indexOf(',') === -1 ? parseInt(str) : parseInt(str.replaceAll(',', ''))
}

/**
 * 根据年份找到数字中的数据
 * @param {Array} original 数组
 * @param {Number} year 
 * @returns Array
 */
let getDataByYear = function (original, year) {
  let obj = [];
  original.forEach(item => {
    for (const key in item) {
      if (item[key] !== '' && strToDigital(key) === year) {
        obj.push({
          name: item.Area,
          value: strToDigital(item[key])
        })
      }
    }
  });
  return obj;
}


/**
 * 根据区名和时间得到对应的树状图数据
 * @param {*} original 数组
 * @param {*} name  区名
 * @param {*} year 年份
 * @returns 
 */
let getTreeMapDataByName = function (original, name, year) {
  let map = [];
  let sum = 0;
  let obj = {};
  obj.children = [];

  original.forEach(item => {
    for (const key in item) {
      if (strToDigital(key) === year) {
        if (map.includes(item.Borough) && item.Borough === name) {
          sum += parseInt(item[key]);
          obj.children.push({
            name: item.Sector,
            value: strToDigital(item[year])
          });
        } else if (!map.includes(item.Borough) && item.Borough === name) {
          map.push(item.Borough);
          obj.children.push({
            name: item.Sector,
            value: strToDigital(item[year])
          })
          sum += parseInt(item[key]);
          obj.name = item.Borough;
        }
      }
    }
  });
  obj.value = sum;
  return obj;
}

/**
 * @param {*} original 数组
 * @param {*} name  区名
 * @param {*} year 年份
 * @returns 
 */
let getAllTreeMapDataByName = function (original, year) {
  let map = [];
  let sum = 0;
  let obj = {};
  obj.children = [];


  original.forEach(item => {
    for (const key in item) {
      if (strToDigital(key) === year) {
        if (map.includes(item.Borough)) {
          sum += parseInt(item[key]);
          obj.children.push({
            name: item.Sector,
            value: strToDigital(item[year])
          });
        } else if (!map.includes(item.Borough)) {
          map.push(item.Borough);
          obj.children.push({
            name: item.Sector,
            value: strToDigital(item[year])
          })
          sum += parseInt(item[key]);
          obj.name = item.Borough;
        }
      }
    }
  });
  obj.value = sum;
  return obj;
}

function getPieData (original, year) {
  let objArr = [];
  original.forEach(item => {
    for (const key in item) {
      if (strToDigital(key) === year) {
        objArr.push(parseInt(item[key]));
      }
    }
  });

  let parentData = [
    {
      name: 'Section C: Manufacturing',
      value: objArr[1]
    },
    {
      name: 'Section F: Construction',
      value: objArr[2]
    },
    {
      name: 'Sections A+B+D+E: Primary and utilities',
      value: objArr[0]
    },
    {
      name: 'Section G: Wholesale, retail and motor trade',
      value: objArr[3] + objArr[4] + objArr[5],
    },
    {
      name: 'Section H: Transportation and storage',
      value: objArr[6]
    },
    {
      name: 'Section I: Accommodation and food service activities',
      value: objArr[7] + objArr[8],
    },
    {
      name: 'Section J: Information and communication',
      value: objArr[9] + objArr[10] + objArr[11] + objArr[12] + objArr[13] + objArr[14],
    },
    {
      name: 'Section K: Financial and insurance activities',
      value: objArr[15] + objArr[16] + objArr[17],
    },
    {
      name: 'Sections L: Real estate',
      value: objArr[18]
    },
    {
      name: 'Section M: professional, scientific & technical',
      value: objArr[19] + objArr[20] + objArr[21] + objArr[22] + objArr[23] + objArr[24],
    },
    {
      name: 'Section N: Administrative and support service activities',
      value: objArr[25] + objArr[26] + objArr[27] + objArr[28] + objArr[29] + objArr[30],
    },
    {
      name: 'Section O: Public administration and defence, compulsory social security',
      value: objArr[31]
    },
    {
      name: 'Section P: Education',
      value: objArr[32]
    },
    {
      name: 'Section Q: Human health and social work activities',
      value: objArr[33] + objArr[34] + objArr[35],
    },
    {
      name: 'Section R: Arts, entertainment and recreation',
      value: objArr[36]
    },
    {
      name: 'Section S: Other service activities',
      value: objArr[37]
    },
  ];

  let childData = [
    {
      name: '45: Wholesale and retail trade and repair of motor vehicles and motorcycles',
      value: objArr[3],
    }, {
      name: '46: Wholesale trade, except of motor vehicles and motorcycles',
      value: objArr[4],
    }, {
      name: '47: Retail trade, except of motor vehicles and motorcycles',
      value: objArr[5],
    },
    {
      name: '55: Accommodation',
      value: objArr[7],
    }, {
      name: '56: Food and beverage service activities',
      value: objArr[8],
    },
    {
      name: '58: Publishing activities',
      value: objArr[9],
    }, {
      name: '59: Motion picture, video and television programme production, sound recording and music publishing activities',
      value: objArr[10],
    }, {
      name: '60: Programming and broadcasting activities',
      value: objArr[11],
    }, {
      name: '61: Telecommunications',
      value: objArr[12],
    }, {
      name: '62: Computer programming, consultancy and related activities',
      value: objArr[13],
    }, {
      name: '63: Information service activities',
      value: objArr[14],
    },
    {
      name: '64: Financial service activities, except insurance and pension funding',
      value: objArr[15],
    }, {
      name: '65: Insurance, reinsurance and pension funding, except compulsory social security',
      value: objArr[16],
    }, {
      name: '66: Activities auxiliary to financial services and insurance activities',
      value: objArr[17],
    }, {
      name: '69: Legal and accounting activities',
      value: objArr[19],
    }, {
      name: '70: Activities of head offices; management consultancy activities',
      value: objArr[20],
    }, {
      name: '71: Architectural and engineering activities; technical testing and analysis',
      value: objArr[21],
    }, {
      name: '72: Scientific research and development',
      value: objArr[22],
    }, {
      name: '73: Advertising and market research',
      value: objArr[23],
    }, {
      name: '74+75: Other professional, scientific and technical activities including Veterinary activities',
      value: objArr[24],
    }, {
      name: '77: Rental and leasing activities',
      value: objArr[25],
    }, {
      name: '78: Employment activities',
      value: objArr[26],
    }, {
      name: '79: Travel agency, tour operator and other reservation service and related activities',
      value: objArr[27],
    }, {
      name: '80: Security and investigation activities',
      value: objArr[28],
    }, {
      name: '81: Services to buildings and landscape activities',
      value: objArr[29],
    }, {
      name: '82: Office administrative, office support and other business support activities',
      value: objArr[30],
    }, {
      name: '86: Human health activities',
      value: objArr[33],
    }, {
      name: '87: Residential care activities',
      value: objArr[34],
    }, {
      name: '88: Social work activities without accommodation',
      value: objArr[35],
    }
  ];

  return { parentData: parentData, childData: childData };
}


/**
 * 得到折线图职业占比的数据
 * @param {*} original 
 * @param {*} year 
 * @returns 
 */
let getProfessionalAllByYear = function (original, year) {
  let objArr = [];
  original.forEach(item => {
    for (const key in item) {
      if (strToDigital(key) === year) {
        objArr.push(parseInt(item[key]));
      }
    }
  });

  let SunChartData = [
    {
      name: 'Sections A+B+D+E: Primary and utilities',
      value: objArr[0]
    },
    {
      name: 'Section C: Manufacturing',
      value: objArr[1]
    },
    {
      name: 'Section F: Construction',
      value: objArr[2]
    },
    {
      name: 'Section G: Wholesale, retail and motor trade',
      children: [{
        name: '45: Wholesale and retail trade and repair of motor vehicles and motorcycles',
        value: objArr[3],
      }, {
        name: '46: Wholesale trade, except of motor vehicles and motorcycles',
        value: objArr[4],
      }, {
        name: '47: Retail trade, except of motor vehicles and motorcycles',
        value: objArr[5],
      }]
    },
    {
      name: 'Section H: Transportation and storage',
      value: objArr[6]
    },
    {
      name: 'Section I: Accommodation and food service activities',
      children: [{
        name: '55: Accommodation',
        value: objArr[7],
      }, {
        name: '56: Food and beverage service activities',
        value: objArr[8],
      }]
    },
    {
      name: 'Section J: Information and communication',
      children: [{
        name: '58: Publishing activities',
        value: objArr[9],
      }, {
        name: '59: Motion picture, video and television programme production, sound recording and music publishing activities',
        value: objArr[10],
      }, {
        name: '60: Programming and broadcasting activities',
        value: objArr[11],
      }, {
        name: '61: Telecommunications',
        value: objArr[12],
      }, {
        name: '62: Computer programming, consultancy and related activities',
        value: objArr[13],
      }, {
        name: '63: Information service activities',
        value: objArr[14],
      }]
    },
    {
      name: 'Section K: Financial and insurance activities',
      children: [{
        name: '64: Financial service activities, except insurance and pension funding',
        value: objArr[15],
      }, {
        name: '65: Insurance, reinsurance and pension funding, except compulsory social security',
        value: objArr[16],
      }, {
        name: '66: Activities auxiliary to financial services and insurance activities',
        value: objArr[17],
      }]
    },
    {
      name: 'Sections L: Real estate',
      value: objArr[18]
    },
    {
      name: 'Section M: professional, scientific & technical',
      children: [{
        name: '69: Legal and accounting activities',
        value: objArr[19],
      }, {
        name: '70: Activities of head offices; management consultancy activities',
        value: objArr[20],
      }, {
        name: '71: Architectural and engineering activities; technical testing and analysis',
        value: objArr[21],
      }, {
        name: '72: Scientific research and development',
        value: objArr[22],
      }, {
        name: '73: Advertising and market research',
        value: objArr[23],
      }, {
        name: '74+75: Other professional, scientific and technical activities including Veterinary activities',
        value: objArr[24],
      }]
    },
    {
      name: 'Section N: Administrative and support service activities',
      children: [{
        name: '77: Rental and leasing activities',
        value: objArr[25],
      }, {
        name: '78: Employment activities',
        value: objArr[26],
      }, {
        name: '79: Travel agency, tour operator and other reservation service and related activities',
        value: objArr[27],
      }, {
        name: '80: Security and investigation activities',
        value: objArr[28],
      }, {
        name: '81: Services to buildings and landscape activities',
        value: objArr[29],
      }, {
        name: '82: Office administrative, office support and other business support activities',
        value: objArr[30],
      },]
    },
    {
      name: 'Section O: Public administration and defence, compulsory social security',
      value: objArr[31]
    },
    {
      name: 'Section P: Education',
      value: objArr[32]
    },
    {
      name: 'Section Q: Human health and social work activities',
      children: [{
        name: '86: Human health activities',
        value: objArr[33],
      }, {
        name: '87: Residential care activities',
        value: objArr[34],
      }, {
        name: '88: Social work activities without accommodation',
        value: objArr[35],
      }]
    },
    {
      name: 'Section R: Arts, entertainment and recreation',
      value: objArr[36]
    },
    {
      name: 'Section S: Other service activities',
      value: objArr[37]
    },
  ];

  return SunChartData;
}