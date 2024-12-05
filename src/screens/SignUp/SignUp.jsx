import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SignUp () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [studentYear, setStudentYear] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [repeatPasswordError, setRepeatPasswordError] = useState(null);
    const [studentNumberError, setStudentNumberError] = useState(null);
    const [studentYearError, setStudentYearError] = useState(null);

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if (!email) {
            setEmailError('Email is reuqired');
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters");
            isValid = false;
        } else {
            setPasswordError(null);
        }

        if (!repeatPassword) {
            setRepeatPasswordError("Password repeat is required");
            isValid = false;
        } else if (repeatPassword !== password) {
            setRepeatPasswordError("Passwords do not match");
            isValid = false;
        } else {
            setRepeatPasswordError(null);
        }

        if (!studentNumber) {
            setStudentNumberError("Student number is required");
            isValid = false;
        } else if (studentNumber.length !== 7) {
            setStudentNumberError("Student number must be 7 characters");
            isValid = false;
        } else {
            setStudentNumberError(null);
        }

        const studentYears = ["1", "2", "3", "4"];
        if (!studentYear || studentYear === "0") {
            setStudentYearError("Student year is required");
            isValid = false;
        } else if (!studentYears.includes(studentYear)) {
            setStudentYearError("Invalid student year");
            isValid = false;
        } else {
            setStudentYearError(null);
        }

        if (isValid) {
            navigate("/dashboard");
        }
    };


    console.log(studentYear)

    return (
        <div className="signUpContainer">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="/images/nhlLogo.png" alt="NHL Logo" />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        {emailError !== null ?
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
                                    {emailError}
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

                        {passwordError !== null ?
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
                                    {passwordError}
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
                            </div>

                        }

                        {repeatPasswordError !== null ?
                            <div>
                                <div className="relative">
                                    <input
                                        id="repeatPassword"
                                        name="repeatPassword"
                                        type="password"
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                        aria-describedby="repeatPassword_error"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 appearance-none dark:text-black dark:border-red border-red dark:focus:border-red focus:outline-none focus:ring-0 focus:border-red peer"
                                        placeholder=" "/>
                                    <label htmlFor="repeatPassword_error"
                                           className="absolute text-sm text-red dark:text-red duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                        Repeat password
                                    </label>
                                </div>
                                <p id="repeatPassword_error"
                                   className="mt-2 text-xs text-red dark:text-red">
                                    <span className="font-medium">Oh!</span>
                                    {repeatPasswordError}
                                </p>
                            </div>
                            :
                            <div className="relative">
                                <input id="repeatPassword"
                                       name="repeatPassword"
                                       type="password"
                                       value={repeatPassword}
                                       onChange={(e) => setRepeatPassword(e.target.value)}
                                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "/>
                                <label htmlFor="password"
                                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                    Repeat password
                                </label>
                            </div>

                        }

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                {studentYearError !== null ?
                                    <div>
                                        < select id="studentYear"
                                                 value={studentYear}
                                                 onChange={(e) => setStudentYear(e.target.value)}
                                                 aria-describedby="studentYear_error"
                                                 className="p-3 bg-gray-50 border border-gray-300 dark:border-red text-sm rounded-lg border-red dark:focus:border-red focus:outline-none block w-full focus:ring-0 focus:border-red peer dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="0" selected className={"text-red dark:text-red"}>Choose a year</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <p id="studentYear_error"
                                           className="mt-2 text-xs text-red dark:text-red">
                                            <span className="font-medium">Oh!</span>
                                            {studentYearError}
                                        </p>
                                    </div>
                                    :
                                    <select id="studentYear"
                                            value={studentYear}
                                            onChange={(e) => setStudentYear(e.target.value)}
                                            className="p-3 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="0" selected>Choose a year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                }

                            </div>

                            <div>
                                {studentNumberError !== null ?
                                    <div>
                                        <div className="relative">
                                            <input
                                                id="studentNumber"
                                                name="studentNumber"
                                                type="number"
                                                value={studentNumber}
                                                onChange={(e) => setStudentNumber(e.target.value)}
                                                aria-describedby="studentNumber_error"
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 appearance-none dark:text-black dark:border-red border-red dark:focus:border-red focus:outline-none focus:ring-0 focus:border-red peer"
                                                placeholder=" "/>
                                            <label htmlFor="studentNumber_error"
                                                   className="absolute text-sm text-red dark:text-red duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                                Student number
                                            </label>
                                        </div>
                                        <p id="studentNumber_error"
                                           className="mt-2 text-xs text-red dark:text-red">
                                            <span className="font-medium">Oh!</span>
                                            {studentNumberError}
                                        </p>
                                    </div>
                                    :
                                    <div className="relative">
                                        <input id="studentNumber"
                                               name="studentNumber"
                                               type="number"

                                               value={studentNumber}
                                               onChange={(e) => setStudentNumber(e.target.value)}
                                               className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                               placeholder=" "/>
                                        <label htmlFor="studentNumber"
                                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                            Student number
                                        </label>
                                    </div>
                                }
                            </div>

                        </div>

                        <div>
                            <CustomButton type="submit" text="Signup"/>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a href="/" className="font-semibold text-primary hover:text-black">
                            Signin
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp
