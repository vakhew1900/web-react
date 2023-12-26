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
import Cookies from "js-cookie";
import SetIsAuthContext from "./context/setIsAuthContext";

function App() {
  const post_tmp: Post[] = [];

  const [posts, setPosts] = useState<Post[]>(post_tmp);
  const [isAuth, setIsAuth] = useState<boolean>(
    Cookies.get("token") !== undefined
  );
  let isLoading: boolean = false;
  useEffect(() => {
    fetch(server_address + "/api/posts", { credentials: "include" })
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
  }, [isAuth]);

  return (
    <>
      <SetPostsContext.Provider value={setPosts}>
      <SetIsAuthContext.Provider value = {setIsAuth}>
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
        </SetIsAuthContext.Provider> 
      </SetPostsContext.Provider>
    </>
  );
}

export default App;
