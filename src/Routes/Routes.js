import app from "../app";

app.use("/api/auth", require("../Routes/Security/Auth.route"));
app.use("/api/user", require("../Routes/Security/User.route"));