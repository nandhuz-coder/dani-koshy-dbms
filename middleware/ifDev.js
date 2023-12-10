function IfDev(req, res, next) {
  try {
    if (req.session.user.user_type == "2") next();
    else if (req.session.user.user_type == "1") res.redirect("/admin");
    else res.redirect("/users");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = IfDev;
