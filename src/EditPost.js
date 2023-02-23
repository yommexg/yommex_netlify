import React, { useEffect } from "react";
//import DataContext from "./context/DataContext";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditBody, setEditTitle]);

  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatedPost);
    navigate(`/post/${id}`);
  };

  return (
    <main className="NewPost">
      {editTitle.length >= 0 && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Visit Our Homepaage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
