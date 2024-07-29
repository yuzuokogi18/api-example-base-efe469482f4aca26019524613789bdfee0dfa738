export interface User {
    user_id: number;
    lastname: string;
    firstname:string;
    phone_number: string;
    email:string;
    role_id: number;
    username: string;
    password: string;
    created_at: string;
    updated_at: string;
    deleted?: boolean; 
}
//ale  y el sugar