import React from "react";

const ConfirmationModal = ({title,closeModal,modalData,sucessAction}) => {
  return (
    <div>
      {/* The button to open modal */}
      

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          
          <div className="modal-action">
            <label onClick={()=> sucessAction(modalData)} htmlFor="confirmation-modal" className="btn btn-sm ">
              DELETE
            </label>
            <button onClick={closeModal} className="btn btn-sm btn-primary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
