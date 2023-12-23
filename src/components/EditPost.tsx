import { Box, Button, TextField } from "@mui/material";
import useSetPosts from "../hooks/useSetPosts";
import { useRef } from "react";
import { Post } from "../types";
import { server_address } from "../server_adress";

type Props = {
  post: Post;
  setIsRedact: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditPost({ post, setIsRedact }: Props) {
  const setPosts = useSetPosts();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const body = formData.get("body") as string;
        const id = formData.get("id") as string;
        const userId = formData.get("userId") as string;

        if (title && body) {
          if (inputRef.current) inputRef.current.value = "";

          const newPost = {
            title: title,
            body: body,
            like: false,
            id: id,
            userId: userId,
          };
          fetch(server_address + "/api/posts", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ post: newPost }),
          })
            .then((response) => response.json())
            .then((json) => {
              if (json.message != undefined) {
                alert(json.message);
                return;
              }

              setPosts?.((prevPosts) => {
                const newPosts = prevPosts.map((t) => {
                  if (t.id === post.id) {
                    return {
                      ...t,
                      title: title,
                      body: body,
                    };
                  }
                  return t;
                });

                return newPosts;
              });
            });

          setIsRedact?.(false);
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        my: 2,
      }}
    >
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="userId" value={post.userId} />

      <TextField
        variant="filled"
        name="title"
        defaultValue={post.title}
        placeholder="post title"
        inputRef={inputRef}
        color={"success"}
      />

      <TextField
        variant="filled"
        name="body"
        defaultValue={post.body}
        inputRef={inputRef}
        multiline
        rows={4}
        color={"success"}
      />

      <Button type="submit" color={"success"}>
        Edit Post
      </Button>
    </Box>
  );
}
