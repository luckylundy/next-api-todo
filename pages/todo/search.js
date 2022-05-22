import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Search = (props) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //検索フォームの内容をフィルタリングAPIに送る
      await fetch("http://localhost:3000/api/todo/filter", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: searchTitle,
          status: searchStatus,
        }),
      });
      router.push("/todo/search");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const onClickReset = () => {
    setSearchTitle("");
    setSearchStatus("");
  };

  return (
    <>
      <h1>TODO検索</h1>
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

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/todo/filter");
  const searchedTodos = await response.json();

  if (!searchedTodos) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      searchedTodos,
    },
  };
};

export default Search;
