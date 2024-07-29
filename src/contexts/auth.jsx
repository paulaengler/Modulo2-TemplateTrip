import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    user: null, // pode ser null ou {}
    signIn: async () => {}, // função entrar na aplicação
    signOut: () => {} // função para "remover" o estado do usuario da aplicar 
})
// simular uma chamada para api => fetch
async function apiAuth(url, data) {
    console.log(url, data)
    return new Promise(resolve => setTimeout(resolve, 3000))
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userLoggedStorage = localStorage.getItem('@lab365:userLogged')

        if(userLoggedStorage) {
            return JSON.parse(userLoggedStorage)
        }

        return null
    })

    async function signIn(data) {
        // console.log('console no contexto', data)
        // exemplo
        if(data.email !== "fulano@teste.com.br" || data.password !== "123") {
            throw new Error("Email/Senha invalida")
        }
        /// fetch ... 
        // const response = await apiAuth('https://api.lab365.com.br/sessions', data)
        await apiAuth('https://api.lab365.com.br/sessions', data)
        
        const userResponse = {
            id: Date.now(),
            first_name: "Fulano de tal",
            email: data.email,
        }

        setUser(userResponse)
        localStorage.setItem('@lab365:userLogged', JSON.stringify(userResponse))
        localStorage.setItem('@lab365:token', Date.now())
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem('@lab365:userLogged')
        localStorage.removeItem('@lab365:token')
    }

    return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}
// custom hook
export function useAuth() {
    const contexto = useContext(AuthContext)

    return contexto
}