import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import useSetPosts from "../hooks/useSetPosts";
import { server_address } from "../server_adress";

export default function AddTodo() {
  const setPosts = useSetPosts();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Container maxWidth={"md"} sx={{ mb: 10 }}>
      <Typography
        variant="h5"
        component={"h3"}
        sx={{ mt: 2 }}
        textAlign={"center"}
      >
        Add Post
      </Typography>
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const title = formData.get("title") as string;
          const body = formData.get("body") as string;
          console.log(body);
          if (title && body) {
            if (inputRef.current) inputRef.current.value = "";
            const newPost = { title: title, body: body, like: false };
            fetch(server_address + "/api/posts", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({ post: newPost }),
            })
              .then((response) => 
                response.json()
              )
              .then((json) => {
                if(json.message != undefined){
                  alert(json.message);
                  return;
                }
                setPosts?.((prevPosts) => {
                  const newPosts = [
                    ...prevPosts,
                    {
                      userId: json.userId,
                      id: json.id,
                      title: json.title,
                      body: json.body,
                      like: json.like,
                    },
                  ];
                  return newPosts;
                });
              });
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
        }}
      >
        <TextField
          variant="filled"
          name="title"
          placeholder="post title"
          inputRef={inputRef}
          color={"success"}
        />

        <TextField
          variant="filled"
          name="body"
          placeholder="post body"
          inputRef={inputRef}
          multiline
          rows={4}
          color={"success"}
        />

        <Button type="submit" color={"success"}>
          Add Post
        </Button>
      </Box>
    </Container>
  );
}
