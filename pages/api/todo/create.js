import prisma from "../../../lib/prisma";

const createTodo = async (req, res) => {
  try {
    await prisma.todo.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).send("create ok");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export default createTodo;
