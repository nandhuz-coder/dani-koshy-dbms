function deleteuser(email) {
  let user = {
    email: email,
  };
  $.ajax({
    type: "POST",
    url: "/dev/deleteUser",
    data: user,
    success: function (response) {
      if (response.message) alert(response.message);
      location.reload();
    },
    error: function () {
      alert("Error: unable to pass request");
    },
  });
}

function adduser(email) {
  let user = {
    email: email,
  };
  $.ajax({
    type: "POST",
    url: "/dev/adduser",
    data: user,
    success: function (response) {
      if (response.message) alert(response.message);
      location.reload();
    },
    error: function () {
      alert("Error: unable to pass request");
    },
  });
}
