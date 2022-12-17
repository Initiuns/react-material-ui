import { AxiosError } from "axios";


export const errorInterceptor = (error: AxiosError) => {
    
    if (error.message === "Network Error") {
        return Promise.reject(new Error("Erro de conexão."))
    }

    if (error.response?.status === 401) {
        return Promise.reject(new Error("Não autorizado."))
    }

    if (error.response?.status === 404) {
        return Promise.reject(new Error("Não encontrado."))
    }

    return Promise.reject(error)

}

