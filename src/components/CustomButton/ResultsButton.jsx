import React from "react";
import "./../../css/components/_resultsButton.scss";

const ResultsButton = ({ icon: Icon, text, onClick, link }) => {
    return (
        <a
        href={link || "#"}
        onClick={onClick}
        className={`results-button`}
        >
            {Icon && <Icon />}
            {text}
        </a>
    );
};

export default ResultsButton;
