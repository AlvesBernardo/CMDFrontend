import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SignIn () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        let isValid = true;
        if (!email) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }

        if (isValid) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="signInContainer">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="/images/nhlLogo.png" alt="NHL Logo"/>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        {emailError ?
                            <div>
                                <div className="relative">
                                    <input
                                        id="email_error"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-describedby="email_error"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 appearance-none dark:text-black dark:border-red border-red dark:focus:border-red focus:outline-none focus:ring-0 focus:border-red peer"
                                        placeholder=" "/>
                                    <label htmlFor="email_error"
                                           className="absolute text-sm text-red dark:text-red duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                        Email address
                                    </label>
                                </div>
                                <p id="email_error"
                                   className="mt-2 text-xs text-red dark:text-red">
                                    <span className="font-medium">Oh!</span>
                                    Email is required.
                                </p>
                            </div>
                            :
                            <div className="relative">
                                <input id="email"
                                       name="email"
                                       type="email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "/>
                                <label htmlFor="email"
                                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                    Email address
                                </label>
                            </div>
                        }

                        {passwordError ?
                            <div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        aria-describedby="password_error"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 appearance-none dark:text-black dark:border-red border-red dark:focus:border-red focus:outline-none focus:ring-0 focus:border-red peer"
                                        placeholder=" "/>
                                    <label htmlFor="password_error"
                                           className="absolute text-sm text-red dark:text-red duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                        Password
                                    </label>
                                </div>
                                <p id="password_error"
                                   className="mt-2 text-xs text-red dark:text-red">
                                    <span className="font-medium">Oh!</span>
                                    Password is required.
                                </p>
                            </div>
                            :

                            <div className="relative">
                                <input id="password"
                                       name="password"
                                       type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "/>
                                <label htmlFor="password"
                                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                    Password
                                </label>
                                {passwordError && <p className="text-red-600">Password is required</p>}
                            </div>

                        }

                        <div>
                            <CustomButton type="submit" text="Login"/>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a href="/signup" className="font-semibold text-primary hover:text-black">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn
