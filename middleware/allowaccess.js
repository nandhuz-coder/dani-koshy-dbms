function IfAccess(req, res, next) {
  try {
    if (!req.session.user) {
      next();
    } else {
      if (req.session.user.user_type == "0") res.redirect("/users");
      else if (req.session.user.user_type == "1") res.redirect("/admin");
      else res.redirect("/dev");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = IfAccess;
