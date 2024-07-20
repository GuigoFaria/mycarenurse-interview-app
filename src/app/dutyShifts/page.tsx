import CardList from "./components/CardList";

export default function DutyShifts() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">MyCareNurse</div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sair
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Turnos</h1>
        <CardList />
      </div>
    </div>
  );
}
