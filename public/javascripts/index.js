const host = "http://localhost:3000/";

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.open("GET", host + "users/login", true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
  xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        document.cookie =
          "authorization=" +
          this.getResponseHeader("authorization") +
          "; path=/";

        window.location = "/dashboard";
      } else {
        console.log(this.status);
        console.log(this.responseText);
      }
    }
  };
  xmlHttpRequest.send(
    JSON.stringify({ username: username, password: password })
  );
}

function register() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.open("POST", host + "users", true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
  xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        document.cookie =
          "authorization=" +
          this.getResponseHeader("authorization") +
          "; path=/";

        window.location.href = "/dashboard";
      } else {
        console.log(this.status);
        console.log(this.responseText);
      }
    }
  };
  xmlHttpRequest.send(
    JSON.stringify({ username: username, password: password })
  );
}
