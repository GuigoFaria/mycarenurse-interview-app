export default function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
        Pegar plantão
      </button>
    </div>
  );
}
