import {
  useEffect,
  useState,
} from "react";

import {
  Card,
  Group,
  Text,
  Loader,
  Badge,
  Stack,
  ActionIcon,
} from "@mantine/core";

import {
  Phone,
  Mail,
} from "lucide-react";

import {
  fetchProjectRequests,
  type ProjectRequest,
} from "../../services/api";

export default function ProjectRequestsPage() {

  const [data,
    setData] =
    useState<ProjectRequest[]>(
      []
    );

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchProjectRequests()
      .then(setData)
      .finally(() =>
        setLoading(false)
      );

  }, []);

  if (loading)
    return (
      <Loader />
    );

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Requests
      </h1>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {data.map(
          (request) => (

<Card
key={request.id}
radius="xl"
className="
bg-white/5
backdrop-blur
border
border-white/10
text-white
"
>

<Stack>

<Group
justify="space-between"
>

<Text fw={700}>
{request.full_name}
</Text>

<Badge
color="blue"
>

{
request.request_type
}

</Badge>

</Group>

<Text
c="gray.4"
>

{
request.company_name
||

"No company"
}

</Text>

<Group>

<ActionIcon
component="a"
href={`tel:${request.phone}`}
variant="light"
color="green"
>

<Phone
size={18}
/>

</ActionIcon>

<Text>

{
request.phone
}

</Text>

</Group>

<Group>

<ActionIcon
component="a"
href={`mailto:${request.email}`}
variant="light"
color="blue"
>

<Mail
size={18}
/>

</ActionIcon>

<Text>

{
request.email
}

</Text>

</Group>

<Text
size="xs"
c="dimmed"
>

{
new Date(
request.created_at
)
.toLocaleString()
}

</Text>

</Stack>

</Card>

)

)}

      </div>

    </div>

  );
}