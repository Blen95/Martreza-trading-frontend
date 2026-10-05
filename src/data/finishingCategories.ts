export interface CategoryField {
  key: string;
  label: string;
  type: "select" | "text";
  options?: string[];
  required?: boolean;
}

export interface FinishingCategory {
  name: string;
  fields: CategoryField[];
}

export const finishingCategories: FinishingCategory[] = [
  // ================= TILES =================

  {
    name: "Ceramic Tiles",
    fields: [
      {
        key: "brand",
        label: "Brand",
        type: "select",
        options: ["Lenox", "East Fork", "Noritake"],
      },
      {
        key: "size",
        label: "Tile Size",
        type: "select",
        options: [
          "30x30",
          "40x40",
          "50x50",
          "60x60",
          "60x120",
          "90x180",
          "20x120",
          "15x60",
          "Custom",
        ],
      },
    ],
  },

  {
    name: "SPC Tiles",
    fields: [
      {
        key: "brand",
        label: "Brand",
        type: "select",
        options: [
          "SPC Premium",
          "Modern Floor",
          "StoneTech",
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          "20x120",
          "15x80",
          "10x80",
          "Custom",
        ],
      },
    ],
  },

  // ================= BATHROOM =================

  {
    name: "Bathroom Fixtures",
    fields: [
      {
        key: "brand",
        label: "Brand",
        type: "select",
        options: [
          "Kohler",
          "Grohe",
          "TOTO",
          "American Standard",
          "Other",
        ],
      },
      {
        key: "type",
        label: "Fixture Type",
        type: "select",
        options: [
          "Wash Basin",
          "Toilet",
          "Bathtub",
          "Shower",
          "Faucet",
          "Sink",
          "Mirror",
          "Other",
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          "60x50",
          "90x50",
          "100x50",
          "120x55",
          "Custom",
        ],
      },
    ],
  },

  // ================= LIGHTING =================

  {
    name: "Lighting Fixtures",
    fields: [
      {
        key: "brand",
        label: "Brand",
        type: "select",
        options: [
          "Philips",
          "Opple",
          "Panasonic",
          "Other",
        ],
      },
      {
        key: "type",
        label: "Lighting Type",
        type: "select",
        options: [
          "Living Room Lighting",
          "Panel Lighting",
          "Strip Lighting",
          "Spot Lighting",
          "Down Lighting",
          "Pendant Lighting",
          "Chandelier",
          "Outdoor Lighting",
          "Other",
        ],
      },
      {
        key: "wattage",
        label: "Wattage",
        type: "text",
      },
    ],
  },

  // ================= FURNITURE =================

  {
    name: "Furniture",
    fields: [
      {
        key: "type",
        label: "Furniture Type",
        type: "select",
        options: [
          "Sofa",
          "Dining Table",
          "Coffee Table",
          "Bed",
          "Wardrobe",
          "TV Stand",
          "Office Furniture",
          "Other",
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          "Small",
          "Medium",
          "Large",
          "Custom",
        ],
      },
    ],
  },

  // ================= ELECTRICAL =================

  {
    name: "Cables & Wires",
    fields: [
      {
        key: "type",
        label: "Cable / Wire Type",
        type: "select",
        options: [
          "Single Core",
          "Multi Core",
          "Flexible Cable",
          "Armoured Cable",
          "Earth Cable",
          "Other",
        ],
        required: true,
      },
      {
        key: "size",
        label: "Cable Size",
        type: "select",
        options: [
          "1.5 mm²",
          "2.5 mm²",
          "4 mm²",
          "6 mm²",
          "10 mm²",
          "16 mm²",
          "25 mm²",
          "35 mm²",
          "50 mm²",
          "70 mm²",
          "95 mm²",
          "120 mm²",
          "150 mm²",
          "Custom",
        ],
        required: true,
      },
      {
        key: "cores",
        label: "Number of Cores",
        type: "select",
        options: [
          "1 Core",
          "2 Core",
          "3 Core",
          "4 Core",
          "5 Core",
          "Other",
        ],
      },
    ],
  },

  {
    name: "Breakers & Switches",
    fields: [
      {
        key: "type",
        label: "Type",
        type: "select",
        options: [
          "MCB",
          "MCCB",
          "RCCB",
          "RCBO",
          "Single Pole Switch",
          "Double Pole Switch",
          "Two-Way Switch",
          "Three-Way Switch",
          "Socket",
          "Other",
        ],
        required: true,
      },
      {
        key: "rating",
        label: "Current Rating",
        type: "select",
        options: [
          "6A",
          "10A",
          "16A",
          "20A",
          "25A",
          "32A",
          "40A",
          "50A",
          "63A",
          "80A",
          "100A",
          "Other",
        ],
      },
      {
        key: "poles",
        label: "Poles",
        type: "select",
        options: [
          "1 Pole",
          "2 Pole",
          "3 Pole",
          "4 Pole",
        ],
      },
    ],
  },

  {
    name: "Conduits",
    fields: [
      {
        key: "type",
        label: "Conduit Type",
        type: "select",
        options: [
          "Rigid PVC",
          "Flexible PVC",
          "Metal Conduit",
          "Other",
        ],
        required: true,
      },
      {
        key: "diameter",
        label: "Diameter",
        type: "select",
        options: [
          "13 mm",
          "16 mm",
          "19 mm",
          "20 mm",
          "25 mm",
          "29 mm",
          "32 mm",
          "40 mm",
          "50 mm",
          "Custom",
        ],
      },
    ],
  },

  // ================= METAL =================

  {
    name: "Fence & Grills",
    fields: [
      {
        key: "type",
        label: "Type",
        type: "select",
        options: [
          "Fence",
          "Window Grill",
          "Door Grill",
          "Security Grill",
          "Balcony Railing",
          "Other",
        ],
      },
      {
        key: "material",
        label: "Material",
        type: "select",
        options: [
          "Mild Steel",
          "Stainless Steel",
          "Aluminium",
          "Other",
        ],
      },
      {
        key: "dimensions",
        label: "Dimensions",
        type: "text",
      },
    ],
  },

  // ================= VENTILATION =================

  {
    name: "Suckers",
    fields: [
      {
        key: "type",
        label: "Type",
        type: "select",
        options: [
          "Kitchen Sucker",
          "Bathroom Sucker",
          "Wall Mounted",
          "Ceiling Mounted",
          "Industrial",
          "Other",
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          "6 inch",
          "8 inch",
          "10 inch",
          "12 inch",
          "Custom",
        ],
      },
    ],
  },

  {
    name: "Ducts",
    fields: [
      {
        key: "type",
        label: "Duct Type",
        type: "select",
        options: [
          "Flexible Duct",
          "GI Duct",
          "Aluminium Duct",
          "PVC Duct",
          "Other",
        ],
      },
      {
        key: "dimensions",
        label: "Dimensions",
        type: "text",
      },
      {
        key: "length",
        label: "Length",
        type: "text",
      },
    ],
  },

  // ================= GYPSUM =================

  {
    name: "Gypsum",
    fields: [
      {
        key: "type",
        label: "Gypsum Type",
        type: "select",
        options: [
          "Gypsum Powder",
          "Gypsum Plaster",
          "Gypsum Compound",
          "Other",
        ],
      },
      {
        key: "application",
        label: "Application",
        type: "select",
        options: [
          "Ceiling",
          "Wall",
          "Partition",
          "Decoration",
          "Other",
        ],
      },
    ],
  },

  {
    name: "Gypsum Board",
    fields: [
      {
        key: "type",
        label: "Board Type",
        type: "select",
        options: [
          "Regular",
          "Moisture Resistant",
          "Fire Resistant",
          "Acoustic",
          "Other",
        ],
      },
      {
        key: "thickness",
        label: "Thickness",
        type: "select",
        options: [
          "6 mm",
          "9 mm",
          "12.5 mm",
          "15 mm",
          "Other",
        ],
      },
      {
        key: "dimensions",
        label: "Dimensions",
        type: "text",
      },
    ],
  },

  {
    name: "Gypsum Block",
    fields: [
      {
        key: "thickness",
        label: "Thickness",
        type: "select",
        options: [
          "50 mm",
          "70 mm",
          "80 mm",
          "100 mm",
          "Custom",
        ],
      },
      {
        key: "dimensions",
        label: "Dimensions",
        type: "text",
      },
    ],
  },

  // ================= NAILS =================

  {
    name: "Nails",
    fields: [
      {
        key: "type",
        label: "Nail Type",
        type: "select",
        options: [
          "Common Nail",
          "Concrete Nail",
          "Finishing Nail",
          "Roofing Nail",
          "Gypsum Nail",
          "Other",
        ],
      },
      {
        key: "size",
        label: "Nail Size",
        type: "text",
      },
    ],
  },

  // ================= FIRE SAFETY =================

  {
    name: "Fire Fighting Equipment",
    fields: [
      {
        key: "type",
        label: "Equipment Type",
        type: "select",
        options: [
          "Fire Extinguisher",
          "Fire Hose",
          "Fire Alarm",
          "Fire Detector",
          "Fire Cabinet",
          "Fire Hydrant",
          "Other",
        ],
        required: true,
      },
      {
        key: "specification",
        label: "Specification",
        type: "text",
      },
    ],
  },
];