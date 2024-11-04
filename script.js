$(document).ready(function() {
    const apiUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/T-A0031-001?Authorization=CWA-D9D189A8-D4BF-4C99-9885-B46EBB12D61E';

    $.getJSON(apiUrl)
        .done(function(data) {
            console.log(data); // 檢查數據結構

            if (data.records && data.records.location) {
                const typhoons = data.records.location;
                let typhoonListHtml = '';

                typhoons.forEach(typhoon => {
                    const name = typhoon.typhoonName || "未知";
                    const intensity = typhoon.intensity || "未知";
                    const status = typhoon.status || "未知";

                    typhoonListHtml += `
                        <div class="typhoon-item">
                            <strong>颱風名稱：</strong> ${name} <br>
                            <strong>預測強度：</strong> ${intensity}級 <br>
                            <strong>當前狀態：</strong> ${status}
                        </div>
                    `;
                });

                $('#typhoon-list').html(typhoonListHtml);
            } else {
                console.error("未能獲取颱風資料");
                $('#typhoon-list').html('<p>無法獲取最新颱風資訊。</p>');
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error("API 請求失敗: " + textStatus + ", " + error);
            $('#typhoon-list').html('<p>無法連接到 API。</p>');
        });
});
