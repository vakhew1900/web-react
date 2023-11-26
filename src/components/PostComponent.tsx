import * as React from 'react';
import { Post } from '../types';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';


type Props = {
    post: Post
}

export default function PostComponent({ post }: Props) {
    return (
        <>
          <Grid item xs={12} md={6}>
            <Card sx={{ display: "flex" }}>
              
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="h5" variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1"  color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
            </Grid>
        </>
    )
}