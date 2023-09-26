import { Router } from "express";
import { ctrlCreateTask, ctrlDeleteTask, ctrlGetTask, ctrlUpdateTask } from "../controllers/task.controllers.js";

const taskRouter = Router();

// endpoint o "Ruta" para traer todas las tareas 

taskRouter.get("/api/tasks", ctrlGetTask)

// endpoint o "Ruta" para crear una tarea

taskRouter.post("/api/tasks", ctrlCreateTask)

// endpoint o "Ruta" para modificar una tarea

taskRouter.put("/api/tasks/:id",ctrlUpdateTask)

// endpoint o "Ruta" para eliminar una tarea

taskRouter.delete("/api/tasks/:id",ctrlDeleteTask)

export {taskRouter}