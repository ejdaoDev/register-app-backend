import app from "../app";

app.use("/api/auth", require("../Routes/Security/Auth.route"));
//app.use("/api/users", require("../Routes/Security/User.route"));
//app.use("/api/idtypes", require("../Routes/Security/IdType.route"));
//app.use("/api/roles", require("../Routes/Security/Role.route"));