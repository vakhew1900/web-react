import { Box, Button, Container, TextField} from "@mui/material";
import { useRef } from "react";
import { server_address } from "../server_adress";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); 
  
  return (
    <Container maxWidth={'md'}>
        
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email') as string;
          const password = formData.get("password") as string;
          const repeat_password = formData.get("repeat_password") as string;
          if(password !== repeat_password) {
            alert("password not equals");
            return;
          }
          
          fetch(server_address + "/api/users/signup", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
            body: JSON.stringify({email:email, password: password})
          }).then( respone => {
              if(respone.status != 200)
              {
                //alert(respone)
                return respone.json();
              }
              else {
                navigate("/");
              }
          }  
          ).then(res => {console.log(res); alert(res.message)})
          
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

        <TextField
          variant="filled"
          name="repeat_password"
          placeholder="repeat password"
          inputRef={inputRef}
          color={"success"}
          type = "password"
        />

        <Button type="submit" color={"success"}>
          SignUp
        </Button>
      </Box>
    </Container>
  );
}
