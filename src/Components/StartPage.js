import React from "react";
import Circular from '../Images/design_one.png';
import Ellipse from '../Images/ellipse_9.png';
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    const getStrartHandler = () => {
        navigate('/dashboard');
    }
    return (
        <div className="gird grid-cols-1">
            <div className="bg-blue-600 container-height relative"> {/* Set position relative */}
                <img src={Ellipse} alt="Description of image" className="absolute right-0" />
                <img src={Circular} alt="Description of image" className="relative top-6" />
                <img src={Circular} alt="Description of image" className="absolute bottom-0 right-0" />
            </div>

            <h1 className="font-bold text-center">Manage What to Do</h1>
            <p className="text-center">The Best way to manage what you have to do, don't forget your plan</p>
            <div className="text-center mt-4" >
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-52" onClick={getStrartHandler}>Get Start</button>
            </div>
        </div>
    );
};

export default StartPage;