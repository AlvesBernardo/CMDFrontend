import React from "react";
import "./../../css/components/_button.scss";

const Button = ({ icon: Icon, text, onClick, type = "primary", link }) => {
    return (
        <a
        href={link || "#"}
        onClick={onClick}
        className={`button ${type === "primary" ? "button-primary" : "button-secondary"}`}
        >
            {Icon && <Icon />}  {/* Render the icon component here */}
            {Icon && <Icon />}
            {text}
        </a>
    );
};

export default Button;
