import {MdOutlineDashboard} from "react-icons/md";
import CustomButton from "../CustomButton/CustomButton.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import TokenManager from "../../helpers/TokenManager.js";

const CustomHeader = ({email, name, profilePicture}) => {
    const navigate = useNavigate();

    const toDashboard = () => {
        if (TokenManager.getUserRole()) {
            navigate("/adminDashboard")
        } else {
            navigate("/studentDashboard")
        }
    }

    return (
        <div className={"customHeaderContainer"}>
            <div className={"profileContainer"}>
                <img src={`../../public/images/${profilePicture}`} alt="" className={"w-20 h-20 rounded-full"}/>

                <div className={"profileDetailsContainer"}>
                    <h5>{name}</h5>
                    <h5>{email}</h5>
                </div>

            </div>
            <div className={"dashboardButtonContainer"}>
                <CustomButton text={"Dashboard"} color={"secondary"} width={'200px'} onClick={toDashboard}>
                    <MdOutlineDashboard/>
                </CustomButton>
            </div>

        </div>
    )
}
export default CustomHeader
