const passport = require("passport");
module.exports = {
  protect: () => {
    return passport.authenticate("jwt", { session: false });
  },
};
