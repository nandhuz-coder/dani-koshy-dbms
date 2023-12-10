$(document).ready(function () {
  var form = $(".registration-form form");
  form.submit(function (event) {
    event.preventDefault();
    var formData = form.serialize();
    $.ajax({
      type: "POST",
      url: "/register",
      data: formData,
      success: function (response) {
        if (!response.message) return;
        alert(response.message);
      },
      error: function () {
        alert("Error: Unable to submit the form.");
      },
    });
  });
});
