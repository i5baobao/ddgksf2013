/*
 QuantumultX script-response-body
 作用：过滤 getConfigList 接口，删除 config.ad / config.search / config.recommend 项
 使用方式：
 ^http:\/\/...\/getConfigList\.do url script-response-body https://你的GitHub路径/FakeiOSAds.js
*/

let body = $response.body;
if (!body) {
    $done({});
}

try {
    let json = JSON.parse(body);

    // 确保 data 是数组
    if (json.data && Array.isArray(json.data)) {
        json.data = json.data.filter(item => {
            if (!item.keyName) return true;
            // 删除 keyName 匹配 config.ad / config.search / config.recommend
            return !/^config\.(ad|search|recommend)$/.test(item.keyName);
        });
    }

    $done({ body: JSON.stringify(json) });

} catch (e) {
    console.log("FakeiOSAds.js parse error:", e);
    // 出错时原样返回
    $done({ body });
}
