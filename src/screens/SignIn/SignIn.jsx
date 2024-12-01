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
                    <img src="/images/nhlLogo.png" alt="NHL Logo" />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                            {emailError && <p className="text-red-600">Email is required</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                            {passwordError && <p className="text-red-600">Password is required</p>}
                        </div>

                        <div>
                            <CustomButton type="submit" text="Login" />
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn
