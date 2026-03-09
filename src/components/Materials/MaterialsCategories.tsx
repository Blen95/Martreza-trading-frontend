import { Container, Title, Text } from "@mantine/core";

const categories = [
  {
    id: "finishing",
    title: "Finishing Construction",
    desc: "Premium tiles, sanitary ware, and decorative materials.",
  },
  {
    id: "civil",
    title: "Civil Construction",
    desc: "Structural materials for durable building foundations.",
  },
  {
    id: "electro",
    title: "Electro-Mechanical",
    desc: "Electrical cables, switches, and mechanical components.",
  },
];

export default function MaterialsCategories() {
  return (
    <section className="py-24 bg-white">
      <Container size="lg">
        <Title order={2} className="text-3xl font-bold text-center mb-16">
          Our Material Categories
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="group border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all"
            >
              <Title order={4} className="mb-4 group-hover:text-black">
                {cat.title}
              </Title>
              <Text className="text-gray-600">{cat.desc}</Text>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}