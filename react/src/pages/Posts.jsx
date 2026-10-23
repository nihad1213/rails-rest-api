import { useEffect, useState } from "react";
import { api } from "../api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api("/posts").then(setPosts).catch((e) => setError(e.message));
  }, []);

  async function addPost(e) {
    e.preventDefault();
    setError("");
    try {
      const post = await api("/posts", { method: "POST", body: { title, body } });
      setPosts([post, ...posts]);
      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function removePost(id) {
    try {
      await api(`/posts/${id}`, { method: "DELETE" });
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={addPost}>
        <h2>New post</h2>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write something…"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn">Publish</button>
      </form>

      {posts.length === 0 && <p className="muted center">No posts yet.</p>}

      {posts.map((post) => (
        <article className="card" key={post.id}>
          <div className="row">
            <h3>{post.title}</h3>
            <button className="btn-danger" onClick={() => removePost(post.id)}>
              Delete
            </button>
          </div>
          <p>{post.body}</p>
          <small className="muted">
            {new Date(post.created_at).toLocaleString()}
          </small>
        </article>
      ))}
    </div>
  );
}