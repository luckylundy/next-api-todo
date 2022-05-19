import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Edit = (props) => {
  // propsからtodoのtitleの初期値を設定;
  const [editTitle, setEditTitle] = useState(props.todo.title);
  // propsからtodoのcontentの初期値を設定;
  const [editContent, setEditContent] = useState(props.todo.content);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/todo/edit/${props.todo.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });
      router.push("/");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <h1>TODOを編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="タイトル"
          required
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          type="text"
          name="content"
          placeholder="内容"
          required
        ></textarea>
        <button>作成</button>
      </form>
      <p>
        <Link href={`/todo/${props.todo.id}`}>
          <a>詳細ページに戻る</a>
        </Link>
      </p>
    </>
  );
};

//propsでtodoのオブジェクトを利用できるようにする
export const getServerSideProps = async (context) => {
  const response = await fetch(
    `http://localhost:3000/api/todo/${context.query.id}`
  );
  const todo = await response.json();

  return {
    props: {
      todo,
    },
  };
};

export default Edit;
