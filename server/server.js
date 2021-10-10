// mongodb
require("./config/db");

const app = require("express")();
const PORT = process.env.PORT || 5000;

//cors
const cors = require("cors");
app.use(cors());

const UserRouter = require("./api/User");
const TodoRouter = require("./routes/todo/todoRoutes");

// For accepting post form data
app.use(require("express").json());

app.use("/api/todos", TodoRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
