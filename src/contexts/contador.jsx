import { useContext, useState, createContext } from 'react'

export const ContadorContext = createContext({
    contador: 0,
    incrementar: () => {},
    decrementar: () => {}
}) 

export function ContadorProvider({ children }) {
    const [contador, setContador] = useState(0)

    function incrementar() {
        setContador(prevState => prevState + 1)
    }

    function decrementar() {
        setContador(prevState => prevState - 1)
    }

    return <ContadorContext.Provider value={{ contador, incrementar, decrementar }}>{children}</ContadorContext.Provider>
}

export function useContador() {
    const contexto = useContext(ContadorContext)

    return contexto
}