import prisma from "../../../../lib/prisma";

const editTodo = async (req, res) => {
  console.log(req.query);
  console.log(req.params);
  try {
    //idがリクエストのqueryに格納されているidと合致するtodoを編集する
    await prisma.todo.update({
      where: {
        id: req.query.id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).send("update ok");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export default editTodo;
