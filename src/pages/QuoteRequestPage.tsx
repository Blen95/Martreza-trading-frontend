// src/pages/QuoteRequestPage.tsx

import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  Button,
  Group,
  Stack,
  Select,
  NumberInput,
  FileInput,
  Image,
  Divider,
  Card,
  ActionIcon,
  Textarea,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";
import {
  useState,
} from "react";

import PhoneField
from "../components/PhoneField";

import {
isValidPhoneNumber,
}
from
"react-phone-number-input";
import { IconTrash, IconPlus } from "@tabler/icons-react";

import { submitQuoteRequest } from "../services/api";
import { finishingCategories } from "../data/finishingCategories"; 

import RegisterPromptModal from "../components/Authentication/RegisterPromptModal";
import SignupModal from "../components/Authentication/SignUpForm";

// ================= TYPES ================= //

interface QuoteItem {
  category: string;
  brand: string;
  size: string;

  quantity: number;
  unit: string;

  design: File | null;
  preview: string | null;

  design2: File | null;
  preview2: string | null;
}

// ================= PAGE ================= //

export default function QuoteRequestPage() {
  const [successModal, setSuccessModal] = useState(false);

  const [signupOpened, setSignupOpened] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [
phoneError,

setPhoneError
]

=
useState("");
  const [signupPrefill, setSignupPrefill] =
    useState({
      name: "",
      email: "",
    });

  // ================= CUSTOMER ================= //

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    notes: "",
  });

  // ================= ITEMS ================= //

  const emptyItem: QuoteItem = {
    category: "",
    brand: "",
    size: "",

    quantity: 1,
    unit: "",

    design: null,
    preview: null,

    design2: null,
    preview2: null,
  };

  const [items, setItems] = useState<QuoteItem[]>([
    emptyItem,
  ]);

  // ================= HELPERS ================= //

  const addItem = () => {
    setItems((prev) => [...prev, { ...emptyItem }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateItem = (
    index: number,
    field: keyof QuoteItem,
    value: any
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  // ================= IMAGE HANDLER ================= //

  const handleImageChange = (
    index: number,
    field: "design" | "design2",
    previewField: "preview" | "preview2",
    file: File | null
  ) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    const updated = [...items];

    updated[index][field] = file;
    updated[index][previewField] = preview;

    setItems(updated);
  };

  // ================= SUBMIT ================= //

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // VALIDATION
      if (!customer.name||!customer.phone) {

notifications.show({
color:"yellow",
title:"Incomplete Form",
message:"Please complete your customer information.",
});
return;
}
if (
!isValidPhoneNumber(
customer.phone
)
) {
setPhoneError(
"Please enter a valid phone number"
);
notifications.show({
color:"red",
title:"Invalid Phone Number",
message:"Enter a valid international phone number.",
});
return;
}

      // ================= FORMDATA ================= //

      const formData = new FormData();

      // CUSTOMER INFO

      formData.append("name", customer.name);

      formData.append("phone", customer.phone);

      formData.append("email", customer.email);

      formData.append("company", customer.company);

      formData.append("notes", customer.notes);

      // ITEMS

      items.forEach((item, index) => {
        formData.append(
          `items[${index}][category]`,
          item.category
        );

        formData.append(
          `items[${index}][brand]`,
          item.brand
        );

        formData.append(
          `items[${index}][size]`,
          item.size
        );

        formData.append(
          `items[${index}][quantity]`,
          String(item.quantity)
        );

        formData.append(
          `items[${index}][unit]`,
          item.unit
        );

        // FIRST IMAGE

        if (item.design) {
          formData.append(
            `items[${index}][design]`,
            item.design
          );
        }

        // SECOND IMAGE

        if (item.design2) {
          formData.append(
            `items[${index}][design2]`,
            item.design2
          );
        }
      });

      // API CALL

      await submitQuoteRequest(formData);

      // SUCCESS

      notifications.show({
        color: "green",
        title: "Success",
        message:
          "Quote request submitted successfully.",
      });

      setSuccessModal(true);

      setSignupPrefill({
        name: customer.name,
        email: customer.email,
      });

      // RESET

      setCustomer({
        name: "",
        phone: "",
        email: "",
        company: "",
        notes: "",
      });

      setItems([
{
...emptyItem
}
]);

setPhoneError(
""
);
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        notifications.show({
          color: "red",
          title: "Submission Failed",
          message:
            err.response.data?.message ||
            "Unable to submit quote request.",
        });
      } else if (err.request) {
        notifications.show({
          color: "orange",
          title: "Network Error",
          message:
            "Please check your internet connection and try again.",
        });
      } else {
        notifications.show({
          color: "red",
          title: "Something Went Wrong",
          message: "Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= UI ================= //

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-16">
      <Container size="lg">
        {/* HEADER */}

        <Stack mb="xl">
          <Title order={1}>
            Construction Material Request
          </Title>

          <Text c="dimmed" maw={700}>
            Submit your required finishing
            materials, preferred sizes, brands,
            quantities, and design references.
          </Text>
        </Stack>

        {/* CUSTOMER INFO */}

        <Paper
          shadow="sm"
          radius="md"
          p="xl"
          mb="xl"
        >
          <Title order={3} mb="lg">
            Customer Information
          </Title>

          <div className="grid md:grid-cols-2 gap-4">
            <TextInput
              label="Full Name"
              required
              value={customer.name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  name: e.currentTarget.value,
                })
              }
            />

            <PhoneField
              label="Phone Number"value={
              customer.phone
              }
              error={
              phoneError
              }
              onChange={(
              value
              )=>{
              setCustomer({
              ...customer,
              phone:
              value
              });
              if (
              phoneError &&
              (
              !value ||
              isValidPhoneNumber(
              value
              )
              )
              ) {
              setPhoneError(
              ""
              );
              }

              }}
              />

            <TextInput
              label="Email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  email: e.currentTarget.value,
                })
              }
            />

            <TextInput
              label="Company"
              value={customer.company}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  company:
                    e.currentTarget.value,
                })
              }
            />
          </div>

          <Textarea
            mt="md"
            label="Project Notes"
            minRows={4}
            value={customer.notes}
            onChange={(e) =>
              setCustomer({
                ...customer,
                notes: e.currentTarget.value,
              })
            }
          />
        </Paper>

        {/* ITEMS */}

        <Stack gap="xl">
          {items.map((item, index) => {
            const categoryData =
              finishingCategories.find(
                (c) => c.name === item.category
              );

            return (
              <Card
                key={index}
                shadow="sm"
                radius="md"
                p="xl"
              >
                <Group
                  justify="space-between"
                  mb="md"
                >
                  <Title order={4}>
                    Item #{index + 1}
                  </Title>

                  {items.length > 1 && (
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() =>
                        removeItem(index)
                      }
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  )}
                </Group>

                <Divider mb="lg" />

                <div className="grid md:grid-cols-2 gap-4">
                  {/* CATEGORY */}

                  <Select
                    label="Item Category"
                    required
                    searchable
                    data={finishingCategories.map(
                      (cat) => ({
                        value: cat.name,
                        label: cat.name,
                      })
                    )}
                    value={item.category}
                    onChange={(value) =>
                      updateItem(
                        index,
                        "category",
                        value || ""
                      )
                    }
                  />

                  {/* BRAND */}

                  <Select
                    label="Item Name/Brand"
                    searchable
                    data={
                      categoryData?.brands.map(
                        (b) => ({
                          value: b,
                          label: b,
                        })
                      ) || []
                    }
                    value={item.brand}
                    onChange={(value) =>
                      updateItem(
                        index,
                        "brand",
                        value || ""
                      )
                    }
                  />

                  {/* SIZE */}

                  <Select
                    label="Size"
                    searchable
                    data={
                      categoryData?.sizes.map(
                        (s) => ({
                          value: s,
                          label: s,
                        })
                      ) || []
                    }
                    value={item.size}
                    onChange={(value) =>
                      updateItem(
                        index,
                        "size",
                        value || ""
                      )
                    }
                  />

                  {/* UNIT */}

                  <Select
                    label="Unit"
                    required
                    data={[
                      {
                        value: "pcs",
                        label: "pcs",
                      },
                      {
                        value: "m²",
                        label: "m²",
                      },
                      {
                        value: "box",
                        label: "box",
                      },
                      {
                        value: "set",
                        label: "set",
                      },
                    ]}
                    value={item.unit}
                    onChange={(value) =>
                      updateItem(
                        index,
                        "unit",
                        value || ""
                      )
                    }
                  />

                  {/* QUANTITY */}

                  <NumberInput
                    label="Quantity"
                    required
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      updateItem(
                        index,
                        "quantity",
                        typeof value === "number"
                          ? value
                          : 1
                      )
                    }
                  />
                </div>

                {/* IMAGES */}

                <Stack mt="lg">
                  {/* FIRST IMAGE */}

                  <FileInput
                    label="Upload Design / Reference Image"
                    accept="image/png,image/jpeg"
                    placeholder="Choose image"
                    value={item.design}
                    onChange={(file) =>
                      handleImageChange(
                        index,
                        "design",
                        "preview",
                        file
                      )
                    }
                  />

                  {/* SECOND IMAGE */}

                  <FileInput
                    mt="md"
                    label="Upload Desired Finished Look"
                    accept="image/png,image/jpeg"
                    placeholder="Choose image"
                    value={item.design2}
                    onChange={(file) =>
                      handleImageChange(
                        index,
                        "design2",
                        "preview2",
                        file
                      )
                    }
                  />

                  {/* FIRST PREVIEW */}

                  {item.preview && (
                    <div className="relative w-fit">
                      <Image
                        src={item.preview}
                        radius="md"
                        w={220}
                        h={220}
                        fit="cover"
                      />

                      <Button
                        size="xs"
                        color="red"
                        mt="xs"
                        variant="light"
                        onClick={() => {
                          updateItem(
                            index,
                            "design",
                            null
                          );

                          updateItem(
                            index,
                            "preview",
                            null
                          );
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  )}

                  {/* SECOND PREVIEW */}

                  {item.preview2 && (
                    <div className="relative w-fit mt-4">
                      <Image
                        src={item.preview2}
                        radius="md"
                        w={220}
                        h={220}
                        fit="cover"
                      />

                      <Button
                        size="xs"
                        color="red"
                        mt="xs"
                        variant="light"
                        onClick={() => {
                          updateItem(
                            index,
                            "design2",
                            null
                          );

                          updateItem(
                            index,
                            "preview2",
                            null
                          );
                        }}
                      >
                        Remove Second Image
                      </Button>
                    </div>
                  )}
                </Stack>
              </Card>
            );
          })}
        </Stack>

        {/* ACTIONS */}

        <Group mt="xl">
          <Button
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={addItem}
          >
            Add Another Item
          </Button>

          <Button
            loading={loading}
            onClick={handleSubmit}
          >
            Submit Quote Request
          </Button>
        </Group>
      </Container>

      {/* SUCCESS MODAL */}

      <RegisterPromptModal
        opened={successModal}
        onClose={() => setSuccessModal(false)}
        onRegister={() => {
          setSuccessModal(false);
          setSignupOpened(true);
        }}
      />

      {/* SIGNUP MODAL */}

      <SignupModal
        opened={signupOpened}
        onClose={() => setSignupOpened(false)}
        defaultEmail={signupPrefill.email}
        defaultName={signupPrefill.name}
      />
    </div>
  );
}