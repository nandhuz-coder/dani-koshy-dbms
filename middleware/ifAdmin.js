function IfAdmin(req, res, next) {
  try {
    if (req.session.user.user_type == "1") next();
    else if (req.session.user.user_type == "0") res.redirect("/users");
    else if (req.session.user.user_type == "2") res.redirect("/dev");
    else res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = IfAdmin;
