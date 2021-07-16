import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "224a310b0059728c337c967ada7fd5";

    const client = new SiteClient(TOKEN);

    const result = await client.items.create({
      itemType: "972335",
      ...request.body,
    });

    return response.json(result);
  }

  return response.status(404).json({
    message: "Nada no GET",
  });
}
