var request = require("request");
var url = "https://www.naver.com/srchrank?frm=main&ag=all&gr=1&ma=-2&si=0&en=0&sp=0";

request(url, function(error, response, html) {
  if (error) {
    throw error
  };
  var keywords = [];
  var keywordsWithSynonyms = [];

  try {
      resultData = JSON.parse(html);
    for(var i in resultData["data"]){
      var keywordData = resultData["data"][i]
      var str = keywordData["rank"] + ". " + keywordData["keyword"];

      keywords.push(str);
      keywordsWithSynonyms.push(str + (keywordData["keyword_synonyms"][0] ? " , " + keywordData["keyword_synonyms"] : ""));
    }
  } catch (e) {
    console.error(e);
  }

  console.log(keywords.join("\n"));
  console.log("\n유사 검색어 포함 : \n" + keywordsWithSynonyms.join("\n"));
});