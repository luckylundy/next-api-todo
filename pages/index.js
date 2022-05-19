import Link from "next/link";

const Home = (props) => {
  return (
    <>
      <h1>TODO一覧</h1>
      <Link href="/todo/create">
        <a>新しいTODOを作成する</a>
      </Link>
      {props.todos.map((todo) => (
        <Link href={`/todo/${todo.id}`} key={todo.id}>
          <a>
            <div>
              <h3>{todo.title}</h3>
              <p>{todo.content}</p>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/todo/read");
  const todos = await response.json();

  //fetchに失敗した場合、エラーページを表示する
  if (!todos) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      todos,
    },
  };
};

export default Home;
