function deleteproduct(email) {
    let user = {
      email: email,
    };
    $.ajax({
      type: "POST",
      url: "/admin/deleteProduct",
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
  