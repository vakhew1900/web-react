import { useEffect, useState } from "react";
import { Post } from "./types";
import SetPostsContext from "./context/setPostsContext";
import AppHeader from "./components/AppHeader";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUp";
import SignInForm from "./components/SignIn";
import { server_address } from "./server_adress";

function App() {
  const post_tmp: Post[] = [];
  
  const [posts, setPosts] = useState<Post[]>(post_tmp);
  let isLoading: boolean = false;
  useEffect(() => {

    fetch(server_address + "/api/posts", {credentials: "include"})
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Request failed.");
      })
      .then((json) => {
        if (isLoading == false) {
          setPosts(json);
          console.log(json);
          isLoading = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SetPostsContext.Provider value={setPosts}>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddPost />
                  <PostList posts={posts} />{" "}
                </>
              }
            />
            <Route path="signup" element={<SignUpForm />} />
            <Route path="login" element={<SignInForm />} />
          </Routes>
        </BrowserRouter>
      </SetPostsContext.Provider>
    </>
  );
}

export default App;
