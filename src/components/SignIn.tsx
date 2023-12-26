import { Box, Button, Container, TextField} from "@mui/material";
import { useRef } from "react";
import { server_address } from "../server_adress";
import { useNavigate } from "react-router-dom";
import useSetIsAuth from "../hooks/useIsAuth";

export default function SignInForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); 
  const setIsAuth = useSetIsAuth();
  return (
    <Container maxWidth={'md'}>
        
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email') as string;
          const password = formData.get("password") as string;
          
          fetch(server_address + "/api/users/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
            body: JSON.stringify({email:email, password: password})
          }).then( respone => {
            if(respone.status != 200)
            {
              
              return respone.json();
            }
            else {
              setIsAuth?.(true);
              navigate("/");
            }
        }  
        ).then(res => {
          console.log(res); 
          if (res == undefined) { return } alert(res.message)})
          
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
          name="email"
          placeholder="your mail"
          inputRef={inputRef}
          color={"success"}
        />

        <TextField
          variant="filled"
          name="password"
          placeholder="password"
          inputRef={inputRef}
          color={"success"}
          type = "password"
        />

        <Button type="submit" color={"success"}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
