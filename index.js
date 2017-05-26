$("#searchButton").click(function(){
  $(".searchBox").toggleClass("animateDown");

  setTimeout(function(){
    $(".searchBox").toggleClass("destroy");
  }, 3000);

  $(".searchForm").css({
    opacity: 1,
    bottom: 0
  });

  $("#searchInput").focus();

})

$("#searchInput").keypress(function(e){
  if(e.which == 13){
    e.preventDefault();
    var input = e.target.value;
    var ENDPOINT = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + input + "&prop=info&inprop=url&utf8=&format=json";
    $.ajax({
      dataType: "jsonp",
      url: ENDPOINT,
      success: function(data){
        $(".collection-item").remove();
        var entries = data.query.search;
        entries.forEach(function(entry){
          var title = entry.title;
          var urlKey = title.replace(/ /g, "_");
          console.log(urlKey);
          var snippet = (entry.snippet).replace(/(<span class="searchmatch">)|(<\/span>)/g, "");
          var href = "https://en.wikipedia.org/wiki/"+urlKey;
          $("#resultsList").append("<a href="+href+" target='_blank' class='collection-item left-align'><h4>"+title+"</h4><p>"+snippet+"</p></li>");
        });
      }
    })
  }
});
