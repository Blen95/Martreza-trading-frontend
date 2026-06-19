import {
  Container,
  TextInput,
  Textarea,
  Button,
  Title,
} from "@mantine/core";

import {
  useState,
} from "react";
import PhoneField
from
"../../components/PhoneField";

import {
isValidPhoneNumber,
}
from
"react-phone-number-input";
import { submitContact } from "../../services/api";

export default function ContactForm() {

  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState({
      full_name: "",
      email: "",
      phone: "",
      message: "",
    });
const [
phoneError,

setPhoneError
]

=
useState("");
  const handleSubmit =
    async (
      e:
      React.FormEvent
    ) => {

      e.preventDefault();
setPhoneError("");

if (

form.phone &&

!isValidPhoneNumber(
form.phone
)

) {

setPhoneError(
"Please enter a valid phone number"
);

return;

}
      try {

        setLoading(true);

        await submitContact(
          form
        );

        alert(
          "Message sent"
        );

        setForm({
          full_name:"",
          email:"",
          phone:"",
          message:"",
        });

      } catch {

        alert(
          "Failed to send"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="py-24 bg-gray-50">

      <Container size="sm">

        <Title
          order={2}
          className="
            text-center
            mb-10
          "
        >
          Send Us a Message
        </Title>

        <form
          className="
            space-y-6
          "
          onSubmit={
            handleSubmit
          }
        >

          <TextInput
            label="Full Name"
            placeholder="Your name"
            required
            value={
              form.full_name
            }
            onChange={(e)=>
              setForm({
                ...form,
                full_name:
                e.currentTarget.value
              })
            }
          />

          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            value={
              form.email
            }
            onChange={(e)=>
              setForm({
                ...form,
                email:
                e.currentTarget.value
              })
            }
          />

          <PhoneField
label="Phone Number"

value={
form.phone
}

error={
phoneError
}

onChange={(
value
)=>{

setForm({

...form,

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

          <Textarea
            label="Message"
            placeholder="Tell us about your project or inquiry"
            minRows={4}
            value={
              form.message
            }
            onChange={(e)=>
              setForm({
                ...form,
                message:
                e.currentTarget.value
              })
            }
          />

          <Button
            type="submit"
            fullWidth
            radius="xl"
            loading={
              loading
            }
            className="
              bg-gray-900
              text-white
              hover:bg-gray-800
            "
          >
            Send Message
          </Button>

        </form>

      </Container>

    </section>
  );
}