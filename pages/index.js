import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// import { useSession, signIn, signOut } from "next-auth/react";

const Home = (props) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const router = useRouter();
  // const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push({
      pathname: "/todo/search",
      query: {
        title: searchTitle,
        status: searchStatus,
      },
    });
  };

  const onClickReset = () => {
    setSearchTitle("");
    setSearchStatus("");
  };

  // if (!session) {
  //   return (
  //     <>
  //       サインインしていません
  //       <br />
  //       <button onClick={() => signIn()}>サインイン</button>
  //     </>
  //   );
  // }

  return (
    <>
      {/* {session.user.name}
      <button onClick={() => signOut()}>サインアウト</button> */}
      <h1>TODO一覧</h1>
      <div>
        <h4>TODOを検索する</h4>
        <form onSubmit={handleSubmit}>
          <select onChange={(e) => setSearchStatus(e.target.value)}>
            <option value="">ステータスを選択</option>
            <option value="notStarted">未着手</option>
            <option value="inProgress">作業中</option>
            <option value="done">完了</option>
          </select>
          <input
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="タイトルを検索"
          />
          <button>検索</button>
        </form>
        <button onClick={onClickReset}>リセット</button>
      </div>
      <Link href="/todo/create">
        <a>新しいTODOを作成する</a>
      </Link>
      {props.todos.map((todo) => (
        <Link href={`/todo/${todo.id}`} key={todo.id}>
          <a>
            <div>
              <h3>{todo.title}</h3>
              <h4>{todo.status}</h4>
              <h5>{todo.content}</h5>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(
    "https://next-api-todo.vercel.app/api/todo/read"
  );

  const todos = await response.json();
  // const newTodos = Object.entries(todos);

  //fetchに失敗した場合、エラーページを表示する
  if (!todos) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      // newTodos,
      todos,
    },
  };
};

export default Home;
