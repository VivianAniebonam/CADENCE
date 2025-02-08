require('dotenv').config();
const connectDB = require('./src/config/db'); 
const app = require('./app');

const PORT = process.env.PORT;

// Connect to database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
