import prisma from "../../../../lib/prisma";

const deleteTodo = async (req, res) => {
  try {
    await prisma.todo.delete({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).send("delete ok");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export default deleteTodo;
