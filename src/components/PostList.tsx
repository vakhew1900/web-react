import { Container, Grid, List, Typography } from '@mui/material'
import { Post} from '../types'
import PostComponent from './PostComponent'


type Props = {
  posts: Post[]
}

export default function TodoList({ posts }: Props) {
  return (
    <Container maxWidth={'md'}>
      <Typography variant='h5' textAlign={'center'} component={'h3'}>Blog</Typography>
      <Grid container>
        {posts.map((post) => (
          <PostComponent key = {post.id} post = {post} />
        ))}
      </Grid>
    </Container>
  )
}