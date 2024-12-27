import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {app} from '../firebase'
function OAuth() {
    const dispatch=useDispatch();
    const handleGoogle=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result =await signInWithPopup(auth,provider);
            const res=await fetch('/apit/auth/google',{
                method:'POST',
                headers:{
                    'Contenet-Type':'application/json',
                },
                body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
            })
            const data=await res.json();
            dispatch(signInSuccess(data));
        }
        catch(error){
            console.log("could not sign in with google",error);
        }
    }
  return (
    <>
    
    <button onClick={handleGoogle} type='button' className=' my-2 w-full py-3 bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with Google</button>
    </>
  )
}

export default OAuth;
