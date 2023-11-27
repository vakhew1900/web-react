import { Box, Button, TextField } from "@mui/material"
import useSetPosts from "../hooks/useSetPosts"
import { useRef } from "react"
import { Post } from "../types"


type Props = {
    post: Post,
    setIsRedact : React.Dispatch<React.SetStateAction<boolean>>
}


export default function EditPost({ post, setIsRedact }: Props) {
    const setPosts = useSetPosts()
    const inputRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef(post.title)
    const bodyRef = useRef(post.body)
    return (
        <Box component={'form'} onSubmit={e => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const title = formData.get('title') as string
            const body = formData.get('body') as string

            
            if (title && body) {
                if (inputRef.current) inputRef.current.value = ''
                
                setPosts?.((prevPosts) => {
                    return prevPosts.map((t) => {
                        if (t.id === post.id) {
                            return {
                                ...t,
                                title: title,
                                body: body 
                            }
                        }
                        return t
                    })
                })

                setIsRedact?.(false)
            }
        }
        }
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
                defaultValue={post.title}
                placeholder='post title'
                inputRef={inputRef}
                color={'success'}
            />

            <TextField
                variant='filled'
                name='body'
                defaultValue={post.body}
                inputRef={inputRef}
                multiline
                rows={4}
                color={'success'}
            />

            <Button type='submit' color={'success'}>Edit Post</Button>
        </Box>
    )

}