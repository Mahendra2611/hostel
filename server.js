import express from 'express'
import router from './Routes/StudentRoutes.js'
import RegistrationRouter from './Routes/Registration.js';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
app.use(router)
app.use(RegistrationRouter)
mongoose.connect('mongodb://127.0.0.1/StdHostel')
.then(()=>console.log("Database connected"))
.catch((err)=>console.log(err))
const PORT = process.env.PORT||3000
app.get('/',(req,res)=>{
    res.send({msg:"server connected"})
})

const server = app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
      // Optionally, you can choose to try another port or exit the process
      process.exit(1);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  });
  process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});


