// import React, { useState, useContext } from "react";
// import { UserContext } from "./App";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import Modal from 'react-modal';





// function AddIncome({ setIncomes }) {




//     return (
//         <div>
//             {/* onClick={openModal} add this code into the add new button */}
//             <Modal isOpen={modalIsOpen} onClose={closeModal} style={customStyles}>
//                 <button onClick={closeModal}>Exit</button>
//                 <form onSubmit={handleSubmit} id="create-income-form">
//                     <h1 className="text-2xl font-semibold mb-4">Add an Income</h1>
//                     <div className="mb-4">
//                         <input
//                             type="date"
//                             value={date}
//                             onChange={handleDateChange}
//                             required
//                             className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <input
//                             onChange={handleIncomeAmountChange}
//                             value={incomeAmount}
//                             placeholder="Income amount in $"
//                             required
//                             type="number"
//                             step="0.01"
//                             id="income"
//                             name="income"
//                             className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                         <label htmlFor="incomeAmount">Income Amount</label>
//                     </div>
//                     <div className="mb-4">
//                         <input
//                             type="text"
//                             value={description}
//                             onChange={handleDescriptionChange}
//                             placeholder="Enter message"
//                             id="description"
//                             name="description"
//                             className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                         <label htmlFor="description">Description</label>
//                     </div>
//                     <div className="mb-4">
//                         <input
//                             type="text"
//                             value={incomeTitle}
//                             onChange={handleIncomeTitleChange}
//                             placeholder="Income title"
//                             id="incomeTitle"
//                             name="incomeTitle"
//                             className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                         <label htmlFor="description">Description</label>
//                     </div>
//                     <div className="mb-4">
//                         <button
//                             className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                             type="submit"
//                         >
//                             Create
//                         </button>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     )
// }

// export default AddIncome;
