export interface User {
    id?: number
    nombre?: string
    apellidos?: string
    password?: string
    poblacion?:string
    provincia?:string
    email?: string
    telefono?: number
    foto?: string
}
export interface accesoUsuario{
    email: string
    password: string
}