import { useEffect, useState } from 'react'
import { Post } from './types'
import SetPostsContext from './context/setPostsContext'
import AppHeader from './components/AppHeader'
import AddPost from './components/AddPost'
import PostList from './components/PostList'
localStorage.getItem("posts") != undefined
function App() {

  let post_tmp: Post[] = [];
  if (localStorage.getItem("posts") != undefined) {
    const posts = localStorage.getItem("posts")
    if (posts)
      post_tmp = JSON.parse(posts);
  }
  const [posts, setPosts] = useState<Post[]>(post_tmp)
  let isLoading: boolean = false;
  useEffect(() => {

    if (localStorage.getItem("posts") == undefined) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          if (response.ok) return response.json()
          throw new Error('Request failed.')
        })
        .then((json) => {
          if (isLoading == false) {
            const newPosts = json.map((post: any) => { return { ...post, like: false } })
            localStorage.setItem("posts", JSON.stringify(newPosts));
            setPosts(newPosts)
            console.log(newPosts)
            isLoading = true;
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  return (
    <>
      <SetPostsContext.Provider value={setPosts}>
        <AppHeader />
        <AddPost />
        <PostList posts={posts} />
      </SetPostsContext.Provider>
    </>
  )
}

export default App
