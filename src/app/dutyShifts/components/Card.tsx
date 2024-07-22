"use client";

import { useState } from "react";
import DutyShiftsService from "../services/dutyShifs.service";
import { Nurse } from "../types/types";

export default function Card({
  title,
  description,
  dateInit,
  dateEnd,
  address,
  nurses,
  currentNurseId,
  accessToken,
  dutyShiftId,
}: {
  title: string;
  description: string;
  dateInit: string;
  dateEnd: string;
  address: Record<string, any>;
  nurses: Array<Nurse>;
  currentNurseId: number;
  accessToken?: string;
  dutyShiftId: number;
}) {
  const [isNurseOnShift, setIsNurseOnShift] = useState(
    nurses.some((nurse) => nurse.id === currentNurseId)
  );
  const [showModal, setShowModal] = useState(false);
  const dutyShiftsService = new DutyShiftsService();

  const handleSubmit = async () => {
    const nurseIds = nurses.map((nurse) => nurse.id);
    nurseIds.push(currentNurseId);
    try {
      await dutyShiftsService.addNurseOnDutyShifts({
        nurseIds,
        accessToken,
        dutyShiftId,
      });
      setIsNurseOnShift(true);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add nurse on duty shift:", error);
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <h2 className="text-xl font-bold text-gray-800">Início: </h2>
      <p className="text-gray-600">{dateInit}</p>
      <h2 className="text-xl font-bold text-gray-800">Fim</h2>
      <p className="text-gray-600">{dateEnd}</p>
      <h2 className="text-xl font-bold text-gray-800">Endereço</h2>
      <p className="text-gray-600">{`${address.street}, ${address.number} - ${address.city}`}</p>

      <button
        className={
          isNurseOnShift
            ? "bg-gray-500 text-white px-4 py-2 rounded mt-4"
            : "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        }
        disabled={isNurseOnShift}
        onClick={() => setShowModal(true)}
      >
        {isNurseOnShift ? "Cadastrado no plantão" : "Pegar plantão"}
      </button>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Aviso de cadastro</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Quer se inscrever nesse plantão?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Não
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Sim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
