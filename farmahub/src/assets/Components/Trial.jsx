import { useState } from "react";

const Trial =()=>{
    const [islogin , setIslogin]=useState(true);
    const [form , setForm]= useState({
        username: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError]= useState("")
    const handleLogin= (e)=>{
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Perform login logic here (e.g., API call)
        console.log("Username:", username);
        console.log("Password:", password);
        alert("Login successful!");
    }
    const handleChange= (e)=>{
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        if (value.length < 3) {
            setError("Username must be at least 3 characters long.");
        }
        else if (value.length > 15) {
            setError("Username must be at most 15 characters long.");
        } else {
            setError("");
        }
    }
    return(
    <div className="max-w-3xl bg-gray-400 rounded-md pt-4 pb-8 inset-0">
        <div className="w-full rounded-md flex flex-col items-center justify-center p-4 bg-[#FFFAFA] shadow-md">
            <h1 className="text-2xl font-bold mb-4">{islogin?"Login":"Register"}</h1>
            <label className="text-2xl font-bold m-4">Username</label>
            <input type="text"
            onChange={handleChange}
            name="username"
            className="w-full p-2 mb-4 border border-gray-300 rounded-full"
            placeholder="Enter your username"
            />
            <label className="text-2xl font-bold m-4">Password</label>
            <input type="password"
            onChange={handleChange}
            name="password"
            className="w-full p-2 mb-4 border border-gray-300 rounded-full"
            placeholder="Enter your username"
            />
           {islogin?"":(
            <div className="max-w-3xl flex justify-center  flex-col">
             <label className="text-2xl font-bold m-4"> Confirm Password</label>
            <input type="text"
            onChange={handleChange}
            name="confirmPassword"
            className="w-full p-2 mb-4 border border-gray-300 rounded-full"
            placeholder="Enter your username"
            />
            </div>)
           }
           <div className="mt-4 text-center mx-auto justify-center">
            <p className="text-red-500">{error}</p>
            <p className="text-gray-600">{islogin?"Don't have an account?":"Already have an account?"}</p>
           </div>
           


        </div>
        <div className="flex justify-center mt-4">
            <button onClick={()=>{setIslogin(!islogin) ,console.log(form)}} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">L{
                islogin?"Login":"Register"}</button>
        </div>
    </div>
    )

}
export default Trial;