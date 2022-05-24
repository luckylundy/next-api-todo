import Link from "next/link";
import { useRouter } from "next/router";

const About = (props) => {
  const router = useRouter();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://next-api-todo.vercel.app/api/todo/delete/${props.todo.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/");
    } catch (err) {
      console.log(err);
      alert("Error: " + err);
    }
  };

  return (
    <>
      <h1>TODO詳細</h1>
      <div>
        <h1>{props.todo.title}</h1>
        <h3>{props.todo.status}</h3>
        <h2>{props.todo.content}</h2>
        <Link href={`/todo/edit/${props.todo.id}`}>
          <a>TODOを編集する</a>
        </Link>
        <a onClick={handleClick}>TODOを削除する</a>
        <Link href="/">
          <a>TODO一覧に戻る</a>
        </Link>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(
    `https://next-api-todo.vercel.app/api/todo/${context.query.id}`
  );
  const todo = await response.json();

  if (!todo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      todo,
    },
  };
}

export default About;
