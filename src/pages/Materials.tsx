import MaterialsHero from "../components/Materials/MaterialsHero";
import MaterialsCategories from "../components/Materials/MaterialsCategories";
import MaterialSection from "../components/Materials/MaterialsSection";
import MaterialsCTA from "../components/Materials/MaterialsCTA";

import finishingImg from "../assets/finishing.jpeg";
import civilImg from "../assets/constructionmaterial.jpeg";
import electroImg from "../assets/Electrical Energy Company.jpeg";

export default function MaterialsPage() {
  return (
    <>
      <MaterialsHero />
      <MaterialsCategories />

      <MaterialSection
        id="finishing"
        title="Finishing Construction Materials"
        description="High-quality finishing materials sourced from trusted international manufacturers."
        items={[
          "Ceramic tiles & flooring",
          "Sanitary ware",
          "Decorative fittings",
          "Lighting fixtures",
        ]}
        image={finishingImg}
        dark
      />

      <MaterialSection
        id="civil"
        title="Civil Construction Materials"
        description="Structural and foundational materials supporting durable construction."
        items={[
          "Cement & aggregates",
          "Reinforcement steel",
          "Concrete solutions",
          "Structural components",
        ]}
        image={civilImg}
      />

      <MaterialSection
        id="electro"
        title="Electro-Mechanical Materials"
        description="Reliable electrical and mechanical components ensuring operational efficiency."
        items={[
          "Electrical cables",
          "Switches & panels",
          "Mechanical accessories",
          "Power distribution materials",
        ]}
        image={electroImg}
        dark
      />

      <MaterialsCTA />
    </>
  );
}