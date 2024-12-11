import React from "react";
import { ClipLoader } from "react-spinners";

function CustomButton({ text, onClick, type = "button", isLoading, children, width = "100%", color = "primary" }) {
    const colorStyles = {
        primary: "bg-primary text-white border-primary hover:bg-white hover:text-primary",
        secondary: "bg-white text-primary border-primary hover:bg-primary hover:text-white",
        error: "bg-white text-red border-red hover:bg-red hover:text-white",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={{ width }}
            className={`flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                colorStyles[color] || colorStyles.primary
            }`}
        >
            {isLoading ? (
                <ClipLoader
                    color={color === "primary" ? "#ffffff" : color === "secondary" ? "#007bff" : "#ff0000"}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <>
                    {children && <span className="mr-2">{children}</span>}
                    {text}
                </>
            )}
        </button>
    );
}

export default CustomButton;
