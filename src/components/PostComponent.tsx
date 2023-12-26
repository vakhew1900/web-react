/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Post } from "../types";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useSetPosts from "../hooks/useSetPosts";
import { EditAttributes } from "@mui/icons-material";
import EditPost from "./EditPost";
import DeleteIcon  from "@mui/icons-material/Delete";
import { server_address } from "../server_adress";

type Props = {
  post: Post;
};

export default React.memo(function PostComponent({ post }: Props) {
  const [isRedact, setIsRedact] = React.useState<boolean>(false);
  const setPosts = useSetPosts();

  let content;

  if (isRedact == false) {
    content = (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="h5" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
      </Box>
    );
  } else {
    content = <EditPost post={post} setIsRedact={setIsRedact}></EditPost>;
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card sx={{ display: "flex", flexDirection: "column" }}>
          {content}

          <Box sx={{ display: "flex", justifyContent: "start", mb: 1, ml: 1 }}>
            <IconButton
              onClick={() => {
                setPosts?.((prevPosts) => {
                  const newPosts = prevPosts.map((t) => {
                    if (t.id === post.id) {
                      return {
                        ...t,
                        like: !t.like,
                      };
                    }
                    return t;
                  });
                  localStorage.setItem("posts", JSON.stringify(newPosts));
                  return newPosts;
                });
              }}
            >
              <FavoriteBorderIcon
                color={post.like ? "error" : "inherit"}
              ></FavoriteBorderIcon>
            </IconButton>

            <IconButton
              onClick={() => {
                const newIsRedact = isRedact;
                setIsRedact(!newIsRedact);
              }}
            >
              <EditAttributes></EditAttributes>
            </IconButton>

            <IconButton
             onClick={() => { 
                

                  fetch(server_address + "/api/posts", {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ post: post }),
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if (json.message != undefined) {
                        alert(json.message);
                        return;
                      }
        
                      setPosts?.((prevPosts) => {
                        const newPosts = prevPosts.filter((t) => { console.log(t); return t.id != post.id}) 
                        return newPosts;
                      });
                    });
             }}>
                <DeleteIcon>
                </DeleteIcon>
            </IconButton>
          </Box>
        </Card>
      </Grid>
    </>
  );
});
