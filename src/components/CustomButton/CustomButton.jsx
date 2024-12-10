import React from "react";
import {ClipLoader} from "react-spinners";

function CustomButton({text, onClick, type, isLoading}) {
    return (
        <button type={type} onClick={onClick} className={"flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 customButton"}>
            {isLoading ?
                <ClipLoader
                    color={"#ffffff"}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                text}
        </button>
    )
}

export default CustomButton
