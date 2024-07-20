import Card from "./Card";

export default function CardList() {
  const cards = [
    {
      id: 1,
      title: "Hospital 1",
      description: "This is the first card description.",
    },
    {
      id: 2,
      title: "Hospital 2",
      description: "This is the second card description.",
    },
    {
      id: 3,
      title: "Hospital 3",
      description: "This is the third card description.",
    },
    {
      id: 4,
      title: "Hospital 4",
      description: "This is the fourth card description.",
    },
    {
      id: 5,
      title: "Hospital 5",
      description: "This is the fifth card description.",
    },
    // Adicione mais cards conforme necessário
  ];

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.id} title={card.title} description={card.description} />
      ))}
    </div>
  );
}
