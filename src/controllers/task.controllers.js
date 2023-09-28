// importar el TaskModel al controlador
import { TaskModel } from "../models/Tasks.js"

// Controller para mostrat Views
export const ctrlView = (req,res) =>{
    res.render("index.ejs",)
}
// controller para traer todas las tareas
export const ctrlGetTask = async (req,res) => {
    try {
        const task = await TaskModel.findAll();
        if(!task) return res.status(404)
        return res.status(200).json(task)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error Server "
        })
    }
}

// controller para crear una tarea

export const ctrlCreateTask = async(req,res) => {
    try {
        const newTask = await TaskModel.create(req.body)
        return res.status(201).json(newTask)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Error Server"
        })
    }
}

// controller para modificar una tarea

export const ctrlUpdateTask = async (req,res) =>{
    const {id} = req.params
    try {
        const task = await TaskModel.findByPk(id)
        if(!task){
            return res.status(404).json({
                message: "Tarea no encontrada"
            })
        }
        task.update(req.body)
        return res.status(200).json(task)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Error Server"
        })
    }

}

// controller para eliminar una tarea 

export const ctrlDeleteTask = async (req,res) =>{
    const {id} = req.params
    console.log(id)
    try {
        const taskDeleted = await TaskModel.destroy({
            where:{
                id:id
            }
        })
        if(!taskDeleted){
            return res.status(404).json({
                message:"Tarea no encontrada"
            })
        }
        return res.status(200).json({
            message:"Tarea Eliminada"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Error Server"
        })
    }
}