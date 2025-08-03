
/**
 * 获取当前APPid
 * @param {*} urlStr 当前地址URL
 * @returns 返回游戏APPID
 */
function getSubdomainFromUrl(urlStr) {
    try {
        // 使用URL构造函数创建新的URL对象
        const url = new URL(urlStr);

        // 获取主机名，例如 'tiaoyitiao.gamextest.xyz'
        let hostname = url.hostname;

        // 分割主机名得到各部分
        let parts = hostname.split('.');

        // 检查parts数组长度确保至少包含3部分（假设标准子域.域名.顶级域名）
        if (parts.length < 3) {
            console.warn("URL does not contain a subdomain or is malformed.");
            return null;
        }

        // 提取子域名，即数组的第一个元素
        let subdomain = parts[0];

        return subdomain;
    } catch (e) {
        console.error("Invalid URL provided:", e.message);
        return null;
    }
}
/**
 * 
 * @param {*} param 要获取的地址参数
 * @returns 
 */
function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}
/**
 * 生成的随机字符串，10-32位，英文、数字
 * @returns 随机字符串返回
 */
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (32 - 10 + 1)) + 10; // 生成10到32之间的随机长度
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}
/**
 * 生成 signature
 * @param {*} seed 
 * @param {*} timestamp 
 * @param {*} secret 
 * @returns 
 */
function generateMD5Signature(seed, timestamp, secret) {
    // 拼接字符串，注意逗号
    const inputString = `${seed},${timestamp},${secret}`;

    // 计算 MD5 哈希
    const hash = CryptoJS.MD5(inputString).toString(CryptoJS.enc.Hex);

    // 返回结果（不含 0x，且不区分大小写）
    return hash.toLowerCase(); // 统一转为小写
}
/**
 * 
 * 
 * 接口请求方法封装
 */
function request(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // 如果是 GET 请求并且有参数，将参数拼接到 URL 中
        if (method === 'GET' && data) {
            const params = new URLSearchParams(data).toString();
            console.log(params, 'params')
            url = `${url}?${params}`;
        }

        xhr.open(method, url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Request failed'));
        };

        // 如果是 POST 请求并且有数据，发送 JSON 数据
        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}
let APPID = 'dts';
let TOKEN = '';
let Secret = 'hZ22QkhEDRmurV3B';
const TEST_URL = 'https://dapp.zetatest.xyz';//测试
const PRO_URL = 'https://dapp.zetatest.xyz';//正式
let url = TEST_URL;
let GetGameInfoRes;
//获取游戏信息
window.GetGameInfo = async () => {

    let params = {
        "appId": APPID,
        "token": TOKEN,
    }
    try {
        if (GetGameInfoRes) {
            // debugger;
            return GetGameInfoRes;
        }
        let res = await request(
            TEST_URL + '/api/game/info',
            'GET',
            params,
        )
        console.log('返回数据', JSON.parse(res))
        if (JSON.parse(res).code == 0) {
            GetGameInfoRes = JSON.parse(res);
        }
        return JSON.parse(res)
    } catch (error) {
        console.log(error, '请求失败 GetGameInfo')
    }
}

//发送支付请求
window.SendPlay = async (payValue, extRemark = `前端发起支付`) => {
    let seed = generateRandomString();
    const timestamp = Date.now();
    let params = {
        "appId": APPID,
        "seed": seed,
        "timestamp": timestamp,
        "signature": generateMD5Signature(seed, timestamp, Secret),
        "token": TOKEN,
        type: 1,
        payValue: payValue,
        extRemark: extRemark
    }
    try {
        let res = await request(
            TEST_URL + '/api/game/pay',
            'POST',
            params,
        )
        console.log('返回数据', JSON.parse(res))
        return JSON.parse(res)
    } catch (error) {
        console.log(error, '请求失败 GetGameInfo')
    }
}

//上传排行榜得分
window.sendRankScore = async (score = 1) => {
    let seed = generateRandomString();
    const timestamp = Date.now();
    let params = {
        "appId": APPID,
        "seed": seed,
        "timestamp": timestamp,
        "signature": generateMD5Signature(seed, timestamp, Secret),
        "token": TOKEN,
        score: score
    }
    try {
        let res = await request(
            TEST_URL + '/api/game/uploadScore',
            'POST',
            params,
        )
        console.log('返回数据', JSON.parse(res))
        return JSON.parse(res)
    } catch (error) {
        console.log(error, '请求失败 GetGameInfo')
    }
}