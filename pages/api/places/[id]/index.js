import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(place);
  }
  if (request.method === "PUT") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);

    return response.status(200).json({ message: "places are updated!" });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return response.status(200).json({ message: "place is deleted!" });
  } else {
    return response.status(405), json({ message: "Method not allowed" });
  }
}
