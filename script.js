let APIKey = "0ZuFboZKuIbY1u6xtw3tYtynpvLbJryV";
const MAX_ARTICLES = 10;

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

document.getElementById("topicSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("topicInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + value + "&api-key=" + APIKey;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let articles = json.response.docs;
      let results = "<div class = 'articleDisplay'>";
      results += "<p class = 'copyright'>" + json.copyright + "</p>";
      results += "<div class = 'col1'>";
      for (let i = 0; i < MAX_ARTICLES / 2; i += 1) {
        if (i < json.response.meta.hits) {
          results += "<div class = 'individualArticle'>";
          results += "<h1>" + articles[i].headline.main + "</h1>";
          results += "<h5>" + articles[i].abstract + "</h5>";
          results += "<a href='" + articles[i].web_url + "'>Check out the full article here!</a>";
          results += "</div>";
        }
      }
      results += "</div><div class = 'col2'>";
      for (let i = MAX_ARTICLES / 2; i < MAX_ARTICLES; i += 1) {
        if (i < json.response.meta.hits) {
          results += "<div class = 'individualArticle'>";
          results += "<h1>" + articles[i].headline.main + "</h1>";
          results += "<h5>" + articles[i].abstract + "</h5>";
          results += "<a href='" + articles[i].web_url + "'>Check out the full article here!</a>";
          results += "</div>"
        }
      }
      results += "</div>";

      document.getElementById("searchResults").innerHTML = results;
    });
});
