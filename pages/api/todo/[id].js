import prisma from "../../../lib/prisma";

const getOneTodo = async (req, res) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export default getOneTodo;
