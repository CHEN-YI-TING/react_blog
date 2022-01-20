import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("yi-ting");
  //loading狀態一開始為false
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    //stop page refresh
    e.preventDefault();
    const blog = { title, body, author };

    //當點擊事件啟動時，將Loading設為true
    setIsPending(true);

    //post request
    //fetch return promises
    fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("new blog added");
        //當點擊事件結束後，loading改回false
        setIsPending(false);
        //history.go(-1);

        //history.push("/blogs/" + blog.id);
        history.push("/");
      })
      .catch((err) => console.log(err));
    //loading不等於false時，載入字樣
    //loading等於false時，add blog
  };
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="yi-ting">yi-ting</option>
          <option value="bar-bar">bar-bar</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Add Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
