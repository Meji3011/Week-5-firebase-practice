import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  const createPost = () => {
    const post = {
      title: "Finish mid roadmap section",
      description: "Finish Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  };

  const getAllPosts = async () => {
    // const data = await getDocs(collection(db, "posts"));
    const { docs } = await getDocs(collection(db, "posts"));
    // This destructures the data we get and only gives us the docs.
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  };

  const getPostById = async (id) => {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  };

  const getPostByUid = async () => {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  };

  const updatePost = async () => {
    const hardcodedId = "oHgNfpaHiapy31wF7FOS";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a $500k job",
    };
    console.log(newPost);
    // updateDoc(postRef, newPost);
  };

  const deletePost = () => {
    const hardcodedId = "oHgNfpaHiapy31wF7FOS";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  };

  return (
    <div className="App">
      <Nav
        user={user}
        loading={loading}
        register={register}
        login={login}
        logout={logout}
        createPost={createPost}
        getAllPosts={getAllPosts}
        getPostById={getPostById}
        getPostByUid={getPostByUid}
        updatePost={updatePost}
        deletePost={deletePost}
      />
    </div>
  );
}

export default App;
