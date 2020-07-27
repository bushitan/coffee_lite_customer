// 计算两点间距离
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

// 生成指定范围的二维点位
const randomPosInRange = (min, max) => Array.from({length: 2}, () => Math.floor(Math.random() * (max - min + 1)) + min);

// 生成指定位数和范围的二维点位组合
const RPIRInCount = (min, max, n) => Array.from({length: n}, () => randomPosInRange(min, max));

// 计算各点的相互距离
const pointsDistance = (points) => {
    let array = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i];
            const p2 = points[j];
            array.push(distance(p1[0], p1[1], p2[0], p2[1]));
        }
    }
    return array
};

// 计算数组中的最小值
const minInArray = (array) => array.sort((a, b) => a - b)[0];

// 计算各点距离与最小距离的倍数
const distanceMultiple = (points) => {
    const distances = pointsDistance(points);
    const minDistance = minInArray(distances);
    const code = distances.map(distance => round(distance / minDistance, 5));
    code.shift();
    return code
};

// 四舍五入到指定位数
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

// 差异相关性
const approximateMatchArray = (arr1, arr2) => {
    let scope = 0;
    arr1 = arr1.sort();
    arr2 = arr2.sort();
    const part = 100 / arr1.length;
    for (let i = 0; i < arr1.length; i++) {
        const reduce = Math.abs(arr1[i] - arr2[i]);
        const partScope = part * (1 - reduce / 10);
        scope = scope + partScope
    }
    let damping = 105;
    if (scope < 90) damping = 125;
    scope = scope * (scope / damping);
    if (scope > 100) scope = 0;
    return scope
};



// 余弦相似度
const cosSimilarity = async (x, y) => {
    x = tf.tensor2d(x);
    y = tf.tensor2d(y);
    const p1 = tf.sqrt(x.mul(x).sum());
    const p2 = tf.sqrt(y.mul(y).sum());
    let p12 = x.mul(y).sum();
    let score = p12.div(p1.mul(p2));
    score = ((await score.data())[0] - 0.9) * 10;
    return score
};

var g_points 
// 主程序
const run = () => {
    // const points1 = false ? [[126, 77], [79, 133], [61, 43]] : RPIRInCount(20, 180, 4)
    var points1 = [[0, 0], [50, 0], [50, 50], [0, 50]]
    // var points1 = RPIRInCount(20, 180, 4)
    var code1 = distanceMultiple(points1);

    var points2 = [[0, 0], [100, 0], [100, 100], [0, 95]]
    var code2 = distanceMultiple(points2);

    // var points2 = RPIRInCount(20, 180, 4)
    // var  code2 = distanceMultiple(points2);

    // console.log(code1, code2);
    var scope = approximateMatchArray(code1, code2)
    // var scope = approximateMatchArray(code1, code1)
    console.log(code1, code1, scope);
    // window.onload = () => draw(points);
};

// 运行
run();


const getResult = (points1, points2) =>{
    var code1 = distanceMultiple(points1);
    var code2 = distanceMultiple(points2);
    var scope = approximateMatchArray(code1, code2)
    return scope
}

module.exports = {
    getResult: getResult
}