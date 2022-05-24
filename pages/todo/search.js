import Link from "next/link";

const Search = (props) => {
  return (
    <>
      <h1>
        検索キーワード：{props.status}・{props.title}
      </h1>

      {props.searchedTodos.map((todo) => (
        <Link href={`/todo/${todo.id}`} key={todo.id}>
          <a>
            <div>
              <h3>{todo.title}</h3>
              <h4>{todo.status}</h4>
              <p>{todo.content}</p>
            </div>
          </a>
        </Link>
      ))}
      <p>
        <Link href="/">
          <a>TODO一覧に戻る</a>
        </Link>
      </p>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const title = context.query.title;
  const status = context.query.status;

  //filter.jsで検索をかける
  const response = await fetch(
    `https://next-api-todo.vercel.app/api/todo/filter?title=${title}&status=${status}`
  );
  const searchedTodos = await response.json();

  return {
    props: {
      searchedTodos,
      title: title,
      status: status,
    },
  };
};

export default Search;
