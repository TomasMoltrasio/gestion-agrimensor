import app from "./app.js";
import connectDB from "./database.js";

connectDB();

async function main() {
  app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
}

main();
