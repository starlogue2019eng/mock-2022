var app = new Vue({
  el: '#app',
  data: {
    message: "",
    candidate: {
      "cand_number": null,
      "surname": null
    }
  },
  mounted: function () { 
    var cand_number = prompt("考生編號尾三位數字"); //ask for login detail
    var surname = prompt("英文姓氏小寫");
    // var cand_number = "999";
    // var surname = "demo";

    var self = this;
    $.getJSON("./assets/list.json", function (data) { //get data from json
      data.forEach(element => {
        if (element.cand_number == cand_number) {
          console.log(element);
          self.candidate = element;
        }
      });
      // if data does not match login detail, then go to 404
      if (data.some(candidate => candidate.cand_number == cand_number && (candidate.surname == surname || candidate.surname == 'paper1'))) {
        document.querySelector("body").style.removeProperty("visibility");
        return true;
      } else {
        window.location.href = "404/index.html";
      }
      // end if
    })
    .fail(function() {
      window.location.href = "404/index.html";
    });

  }
} );
