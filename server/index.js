const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const userRouter = require('./routes/user/user');
const signupRouter = require('./routes/user/signup');
const loginRouter = require('./routes/user/login');
const logoutRouter = require('./routes/user/logout');
const videoRouter = require('./routes/video/video');
const likeRouter = require('./routes/video/like');
const commentRouter = require('./routes/video/comment');
const subscribeRouter = require('./routes/video/subscribe');
const playlistRouter = require('./routes/video/playlist');

const app = express();

mongoose.connect( config.mongoURI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
).then(() => console.log("CMA-MongoDB connected..."))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//=================================
//             Routes
//=================================

//============ USER ==============//
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/user', userRouter);

//============ VIDEO =============//
app.use('/video', videoRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);
app.use('/subscribe', subscribeRouter);
app.use('/playlist', playlistRouter);

//============= API ==============//
app.use('/auth', authRouter);
app.use('/uploads', uploadRouter);
app.use('/uploads', express.static('uploads'));


const port = 5000;

app.listen(port, () => {
  console.log(`create-my-app listening at http://localhost:${port}`)
})