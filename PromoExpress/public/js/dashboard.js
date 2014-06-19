var updatePlayers = function updatePlayers(){
   $.ajax({
      url: "http://localhost:3002/api/v1/players",
      async: true,
      type: "GET",
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json"
   })

   .done(function(results) {
      console.log(results)
      var tbody = ""
      //var tbody = "<tbody id=\"tbodyPlayers\">"
      $.each(results, function(index) {
         tbody += "<tr>"
         tbody += "<td>" + results[index]._id + "</td>"
         tbody += "<td>" + results[index].name + "</td>"
         if (results[index].team.length != 0) {
            tbody += "<td>" + results[index].team[0].name + "</td>"
         } else {
            tbody += "<td></td>"
         }
         tbody += "</tr>"
      })
      //tbody += "</tbody>"
      document.getElementById("tbodyPlayers").innerHTML = tbody
   })

   .error(function(err) {
      console.log(err);
   })
}


console.log("Updating Players")
updatePlayers();
