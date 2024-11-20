import express, { json } from "express";
const app = express();
import cors from "cors";
import { config } from "dotenv";
import projectsRoutes from "./routes/projects.routes.js";

// settings

config();
app.set("port", process.env.PORT || 8000);

// middlewares

app.use(cors());
app.use(json());

// routes

app.use("/api/projects", projectsRoutes);

export default app;
