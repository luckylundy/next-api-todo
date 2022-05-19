import prisma from "../../../lib/prisma";

const getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export default getAllTodos;
