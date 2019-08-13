var request = require("request");
var url = "https://www.naver.com/";
request(url, function(error, response, html) {
  if (error) {
    throw error
  };
  html = html.replace(/(<([^>]+)>)/g, "");
  var keywords = [];
  try {
    html = html.split("급상승 검색어")[1];
    html = html.split("급상승")[0];
    html = html.split("\n");
    for (var i in html) {
      if (html[i] > 20 || i > 300) break;
      if (html[i].trim() == "") continue;
      if (!isNaN(html[i])) {
        keywords[html[i]] = html[i].trim() + ". " + html[Number(i) + 1].trim();
      }
    }
  } catch (e) {
    console.error("오류발생\n" + e);
  }
  console.log(keywords.join("\n"));
});
