const express = require('express');
const cors = require('cors');
const signupRouter = require("./routes/signupRoute");
const loginRouter = require("./routes/loginRoute");
const bookRouter = require("./routes/bookRoute");
const userRouter = require("./routes/userRoute");
const reserveRouter = require("./routes/reserveRoute");
const transactionRouter = require("./routes/transactionRoute");
const availableRouter = require("./routes/availableRoute");
const libraryRouter = require("./routes/libraryRoute");
const adminRouter = require("./routes/adminRoute");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 2000;

// Enable CORS for all routes and origins
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Use routes
app.use("/api/auth", signupRouter, loginRouter);
app.use("/api", bookRouter, userRouter, reserveRouter, transactionRouter, availableRouter, libraryRouter, adminRouter);

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
