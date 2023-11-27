import * as React from 'react';
import { Post } from '../types';
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useSetPosts from '../hooks/useSetPosts';
import { EditAttributes } from '@mui/icons-material';
import EditPost from './EditPost';



type Props = {
    post: Post
}

export default function PostComponent({ post }: Props) {

    const [isRedact, setIsRedact] = React.useState<boolean>(false)
    const setPosts = useSetPosts()

    let content;

    if (isRedact == false) {
        content = <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h5" variant="h5">
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {post.body}
                </Typography>
            </CardContent>
        </Box>
    }
    else {
        content = <EditPost post = {post} setIsRedact = {setIsRedact}></EditPost>
    }

    return (
        <>
            <Grid item xs={12} md={6}>
                <Card sx={{ display: "flex", flexDirection: "column", }}>


                    {content}

                    <Box sx={{ display: "flex", justifyContent: "start", mb: 1, ml: 1 }}>
                        <IconButton onClick={() => {
                            setPosts?.((prevPosts) => {
                                return prevPosts.map((t) => {
                                    if (t.id === post.id) {
                                        return {
                                            ...t,
                                            like: !t.like
                                        }
                                    }
                                    return t
                                })
                            })
                        }}
                        >
                            <FavoriteBorderIcon color={(post.like) ? 'error' : 'inherit'}>

                            </FavoriteBorderIcon>
                        </IconButton>

                        <IconButton onClick={() => {
                            const newIsRedact = isRedact;
                            setIsRedact(!newIsRedact)
                        }
                        }
                        >
                            <EditAttributes></EditAttributes>
                        </IconButton>
                    </Box>

                </Card>
            </Grid >
        </>
    )
}