import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Nav({
  user,
  loading,
  register,
  login,
  logout,
  createPost,
  getAllPosts,
  getPostById,
  getPostByUid,
  updatePost,
  deletePost
}) {
  return (
    <nav>
      <div className="nav__container">
        <FontAwesomeIcon className="nav__logo" icon="magic-wand-sparkles" />
        <div className="nav__links">
          {loading ? (
            <p>Loading...</p>
          ) : user.email ? (
            <>
              <p>Welcome, {user.email}</p>
              <button className="btn" onClick={logout}>
                Logout
              </button>
              <button className="btn" onClick={createPost}>
                Create Post
              </button>
              <button className="btn" onClick={getAllPosts}>
                Get All Posts
              </button>
              <button className="btn" onClick={getPostById}>
                ID Post
              </button>
              <button className="btn" onClick={getPostByUid}>
                UID Post
              </button>
              <button className="btn" onClick={updatePost}>
                update Post
              </button>
              <button className="btn" onClick={deletePost}>Delete Post</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={register}>
                Register
              </button>
              <button className="btn" onClick={login}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
