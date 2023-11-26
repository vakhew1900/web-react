import { useEffect, useState } from 'react'
import { Post } from './types'
import SetPostsContext from './context/setPostsContext'
import AppHeader from './components/AppHeader'
import AddPost from './components/AddPost'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  let isLoading : boolean = false;
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('Request failed.')
      })
      .then((json) => { 
        // if(isLoading == false)
        {
          setPosts(json) 
          console.log(json)
          isLoading = true;
        }
      } )
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <SetPostsContext.Provider value={setPosts}>
        <AppHeader />
        <AddPost/>
      </SetPostsContext.Provider>
    </>
  )
}

export default App
