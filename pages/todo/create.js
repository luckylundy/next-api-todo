import { useState } from "react";
import { useRouter } from "next/router";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/todo/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      router.push("/");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <h1>TODO作成</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="タイトル"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          name="content"
          placeholder="内容"
          required
        ></textarea>
        <button>作成</button>
      </form>
    </>
  );
};

export default Create;
