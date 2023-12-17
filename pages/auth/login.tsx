import React, { useState, SyntheticEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'
import ReCAPTCHA from "react-google-recaptcha";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { useLocalStorageValue } from '@react-hookz/web'


export default function Login() {

	const [ showPassword, setShowPassword ] = useState(false);

	const usersD = useLocalStorageValue("userId")
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const router = useRouter();

	const [ users, setUsers ] = useState({
		user: "",
		password: ""
	})

	const validateEmail = (email: string) => {
		// Regular expression for a valid email address
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string) => {
		// Regular expression for a strong password (at least 8 characters, with a mix of uppercase, lowercase, and numbers)
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		return passwordRegex.test(password);
	};


	const [ emailError, setEmailError ] = useState('');
	const [ passwordError, setPasswordError ] = useState('');

	const [ onReCaptcha, setOnReCaptcha ] = useState(false)


	const onChange = () => {
		setOnReCaptcha(() => !onReCaptcha)
	}

	const [ password, setPassword ] = useState(false)
	const onHandlePassword = () => {
		setPassword(() => !password)
	}

	// const onHandleSubmitForm = async (e: SyntheticEvent) => {
	// 	e.preventDefault();

	// 	// Validation block
	// 	if (!validateEmail(users.user)) {
	// 		setEmailError('Please enter a valid email address');
	// 		return;
	// 	}
	// 	setEmailError('');

	// 	// Password validation
	// 	if (!validatePassword(users.password)) {
	// 		setPasswordError('Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers');
	// 		return;
	// 	}
	// 	setPasswordError('');

	// 	// Make the login request
	// 	const res = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/user/login", {
	// 		method: "POST",
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({
	// 			email: users.user,
	// 			password: users.password
	// 		})
	// 	})

	// 	const data = await res.json()
	// 	const promise = () => new Promise((resolve) => setTimeout(resolve, 5000));
	// 	// Check the success of the login request
	// 	if (res.ok) {
	// 		const cookies = Cookies.set("ecom_token", data, {
	// 			expires: 60 * 60 * 24 * 7,
	// 			path: "/",
	// 			sameSite: "none",
	// 			secure: true
	// 		})

	// 		if (cookies) {
	// 			const { role, userID }: any = jwtDecode(cookies)
	// 			if (role === "admin") {
	// 				usersD.set(userID)
	// 				router.push("/admin/customer")
	// 			} else {
	// 				usersD.set(userID)
	// 				router.push('/')
	// 			}

	// 		}

	// 	}
	// 	else {
	// 		toast.promise(promise, {
	// 			loading: 'Loading...',
	// 			success: (products) => {
	// 				return `You have logged in successfully`;
	// 			},
	// 		});
	// 	}
	// }

	const [ errorMessage, setErrorMessage ] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		   
			   // Check the success of the login request
			   try {
				const res = await fetch('https://minervasales-23b0919d60c1.herokuapp.com/user/login', {
				  method: "POST",
				  headers: {
					'Content-Type': 'application/json',
					
				  },
				  body: JSON.stringify({
					email: users.user,
					password: users.password
				  })
				  
				})
				
				const promise = () => new Promise((resolve) => setTimeout(resolve, 5000));
				// Check the success of the login request

				if (!res.ok) {
				  const htmlContent = await res.text();
		  
				  setErrorMessage(htmlContent)
				  toast.warning(htmlContent)
				}


				const data = await res.json()
				
				const cookies = Cookies.set("ecom_token", data, {
					expires: 60 * 60 * 24 * 7,
					path: "/",
					sameSite: "none",
					secure: true
				})
	
				if (cookies) {
					const { role, userID }: any = jwtDecode(cookies)
					if (role === "admin") {
						usersD.set(userID)
						router.push("/admin/customer")
					} else {
						usersD.set(userID)
						router.push('/')
					}
	
				}
		  
				return data
		  
			  } catch (error) {
				console.log(error)
			  }
	   }



	return (

		<div className="h-screen md:flex">
			
			<div
				className="relative overflow-hidden md:flex w-1/2 i justify-around items-center hidden ">
				<div>
					<Image src="/loginregister.jpeg" alt="" height={10} width={1000}></Image>
				</div>
				<div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
				<div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
				<div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
				<div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
			</div>
			<div className="flex md:w-1/2 h-screen lg:h-screen justify-center py-10 items-center bg-gradient-to-r  from-[#FFBD59] via-gray-50 to-[#FFBD59]">
				<form onSubmit={handleSubmit}>
					<h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
					<p className="text-sm font-normal text-gray-600 mb-7">Welcome Back to Minerva Sales Corporation</p>
					<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
							<path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
						</svg>
						<input pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" // Email regex pattern
							title="Please enter a valid email address"
							className="pl-2 outline-none border-none" type="text" name="email" id="email"
							placeholder="Email Address"
							onChange={(e) => setUsers({ ...users, user: e.target.value })} />
					</div>

					<div className="flex items-center border-2 py-2 px-3 rounded-2xl">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
							<path stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
						</svg>
						<input

							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" // Password regex pattern
							title="Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers"
							className="pl-2 outline-none border-none" type={showPassword ? "text" : "password"} name="password" id="password"
							placeholder="Password"
							onChange={(e) => setUsers({ ...users, password: e.target.value })} />
						<button type="button" onClick={togglePasswordVisibility} className="focus:outline-none ml-2">
							{showPassword ? (
								<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" /></svg>
							)}
						</button>
					</div>
					<br></br>
					<ReCAPTCHA
						sitekey="6Lc7TSUpAAAAAI1U6gfmX3RoDuzwZXVHCi9EjqL3"
						onChange={onChange}
					/>
					<button disabled={onReCaptcha === false} type="submit" className="block w-full bg-[#FFBD59] mt-4 py-2 rounded-2xl text-black font-semibold mb-2">Login</button>

					<span className="text-sm ml-2 hover:text-blue-500 cursor-pointer" onClick={() => router.push("/auth/changePassword")}>Forgot Password?</span>
					<br></br>
					<span className="text-sm ml-2"> Don{"'"}t have an Account? <span onClick={() => router.push("/auth/register")} className="text-sm hover:text-blue-500 cursor-pointer">Sign Up.</span></span>
					<Toaster richColors />
				</form>
			</div>
		</div>

	)
}



