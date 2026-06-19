import {
useEffect,
useState,
} from "react";

import {
Card,
Text,
Loader,
Group,
ActionIcon,
Stack,
} from "@mantine/core";

import {
Phone,
Mail,
} from "lucide-react";

import {
fetchContactMessages,
type ContactMessage,
} from "../../services/api";

export default function InquiriesPage() {

const [
messages,

setMessages
]

=
useState<
ContactMessage[]
>(
[]
);

const [
loading,

setLoading
]

=
useState(
true
);

useEffect(
()=>{

fetchContactMessages()

.then(
setMessages
)

.finally(
()=>

setLoading(
false
)
);

},
[]
);

if (
loading
)

return (
<Loader />
);

return (

<div
className="
p-8
"
>

<h1
className="
text-3xl
font-bold
mb-8
"
>

Inquiries

</h1>

<div
className="
grid
gap-6
"
>

{

messages.map(

(
m
)=>(

<Card
key={
m.id
}
radius="xl"
className="
bg-white/5
border
border-white/10
text-white
"
>

<Stack>

<Text
fw={
700
}
>

{
m.full_name
}

</Text>

<Group>

<ActionIcon
component="a"
href={`tel:${m.phone}`}
color="green"
>

<Phone
size={
18
}
/>

</ActionIcon>

<Text>

{
m.phone
||

"No phone"
}

</Text>

</Group>

<Group>

<ActionIcon
component="a"
href={`mailto:${m.email}`}
color="blue"
>

<Mail
size={
18
}
/>

</ActionIcon>

<Text>

{
m.email
}

</Text>

</Group>

<Text>

{
m.message
}

</Text>

</Stack>

</Card>

)

)

}

</div>

</div>

);
}