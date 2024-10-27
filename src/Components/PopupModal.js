import React, { useEffect } from "react";

const CommonModal = ({ isOpen, onClose, children }) => {
    const modalClasses = isOpen ? "block" : "hidden";

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("popup-open");
        } else {
            document.body.classList.remove("popup-open");
        }
    }, [isOpen]);

    const closeClickHandler = (e) => {
        e.preventDefault();
        document.body.classList.remove("popup-open");
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 overflow-y-auto border ${modalClasses}`}
                style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
                    >
                        <div className="closePopup p-2 flex justify-end">
                            <button type="button" onClick={closeClickHandler} className="text-gray-500 hover:text-gray-800">
                                X
                            </button>
                        </div>
                        <div className="p-6">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommonModal;
