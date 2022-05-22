import prisma from "../../../lib/prisma";

const filteringTodos = async (req, res) => {
  console.log(req);
  try {
    const todos = await prisma.todo.findMany({
      where: {
        OR: [
          {
            title: {
              contains: req.query.title,
            },
          },
          {
            status: req.query.status,
          },
        ],
      },
    });
    await res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export default filteringTodos;
