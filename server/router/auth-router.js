const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middleware/validate-middleware");
const registerSchema = require("../validators/auth-validator");

// router.get("/", (req, res) => {
//   res.status(200).send("Hello, World! by deependra");
// });

router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(registerSchema), authControllers.register);
router.route("/login").post(authControllers.login);

module.exports = router;
