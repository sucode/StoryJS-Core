if(typeof VMM != 'undefined') {
    var lang_zh_cn = {
        lang: "zh-cn",
        date: {
                  month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                  month_abbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                  day: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                  day_abbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
              }, 
        dateformats: {
                         year: "yyyy",
                         month_short: "mmm",
                         month: "yyyy'年'mmmm",
                         full_short: "mmmd",
                         full: "yyyy'年'mmmmd",
                         time_no_seconds_short: "HH:MM",
                         time_no_seconds_small_date: "HH:MM'<br/><small>'yyyy'年'mmmmd'</small>'",
                         full_long: "dddd',' HH:MM yyyy'年'mmmd",
                         full_long_small_date: "HH:MM'<br/><small>'dddd',' yyyy'年'mmmd'</small>'"
                     },
        messages: {
                      loading_timeline: "加载中... ",
                      return_to_title: "回到第一页",
                      expand_timeline: "伸展时间",
                      contract_timeline: "缩短时间",
                      loading_content: "内容加载中...",
                      loading: "加载中..."

                  }
    }

    if (typeof VMM.Language == 'undefined') {
        VMM.Language = {};
    }

    VMM.Util.mergeConfig(VMM.Language, {'zh-cn' : lang_zh_cn});
}
