import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useRef } from 'react'
import useSetPosts from '../hooks/useSetPosts'

export default function AddTodo() {
  const setPosts = useSetPosts()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <Container maxWidth={'sm'}>
      <Typography
        variant='h5'
        component={'h3'}
        sx={{ mt: 2 }}>
        Add todo
      </Typography>
      <Box component={'form'}
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const title = formData.get('title') as string
          const body = formData.get('body') as string 
          console.log(body)
          if (title) {
            if (inputRef.current) inputRef.current.value = ''
            setPosts?.((prevPosts) => {
              return [...prevPosts, {
                userId: 1,
                id: prevPosts.length + 1,
                title: title,
                body: body,
              }]
            })
          }
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          my: 2
        }}
      >
        <TextField
          variant='filled'
          name='title'
          placeholder='post title'
          inputRef={inputRef} />

        <TextField
          variant='filled'
          name='body'
          placeholder='post body'
          inputRef={inputRef} 
          multiline
          rows={4}
          />

        <Button type='submit'>Add Post</Button>
      </Box>
    </Container>
  )
}