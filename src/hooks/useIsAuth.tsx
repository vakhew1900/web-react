import { useContext } from "react"
import SetIsAuthContext from "../context/setIsAuthContext"


const useSetIsAuth = () => useContext(SetIsAuthContext)

export default useSetIsAuth