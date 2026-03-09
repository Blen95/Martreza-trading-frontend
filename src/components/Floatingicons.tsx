// FloatingIcons.tsx
import { ActionIcon } from "@mantine/core";
import { IconBrandTelegram, IconBrandWhatsapp, IconMail, IconRecordMail } from "@tabler/icons-react";

export default function FloatingIcons() {
  return (
    <div className="fixed bottom-10 right-8 flex flex-col gap-4 z-50">
      {/* WhatsApp */}
      <ActionIcon
        size="xl"
        radius="xl"
        color="green"
        variant="filled"
        component="a"
        href="https://wa.me/251905787878" // replace with your number
        target="_blank"
      >
        <IconBrandWhatsapp size={28} />
      </ActionIcon>
      {/*telegram*/}
<ActionIcon
        size="xl"
        radius="xl"
        color="blue"
        variant="filled"
        component="a"
        href="https://t.me/thedevelopergroup" 
        target="_blank"
      >
        <IconBrandTelegram size={28} />
      </ActionIcon>
        {/* Email (Gmail compose) */}
      <ActionIcon
        size="xl"
        radius="xl"
        color="red"
        variant="filled"
        component="a"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=bluassefa21@gmail.com"
        target="_blank"
      >
        <IconMail size={28} />
      </ActionIcon>
    </div>
  );
}
