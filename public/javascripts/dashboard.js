const host = "http://localhost:3000/";

function searchUser() {
  let username = document.getElementById("search-box").value;
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.open("GET", host + `users/${username}`, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
  xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlHttpRequest.setRequestHeader("authorization", getCookie("authorization"));
  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      alert(JSON.parse(this.responseText).username + "exists.");
    } else {
      alert(JSON.parse(this.responseText).message);
      console.log(this.status);
      console.log(this.responseText);
    }
  };
  xmlHttpRequest.send();
}

function logout() {
  document.cookie =
    "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.location = "/";
}

// function to get cookie value by passing cookie name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
