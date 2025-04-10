"use client"
import Register from "../../lib/ui/register/register"
import { useForm } from "react-hook-form";
const SignUp = ()=>{
    const { register, handleSubmit,formState: { errors } } = useForm();

    const onSubmit = async(data:any) => {
        const response = await fetch("api/register",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
    
           });

           const res = await response.json()
           console.log(res)
        console.log(data)};
    return(
        <Register register={register} onSubmit={onSubmit} handleSubmit={handleSubmit}/>
    )
}
export default SignUp 