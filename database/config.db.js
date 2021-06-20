const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Base de datos operativa.');
  } catch (err) {
    console.error(err);
    throw new Error("Error al inicializar la base de datos.");
  }
};

module.exports = {
  dbConnection,
};
