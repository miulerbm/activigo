import { NextResponse } from "next/server";
import { uploadImage } from "../../../lib/server/storage";
import { toErrorResponse } from "../../../lib/server/errors";

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg"]);
const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_PREFIXES = new Set(["activities", "suggestions"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const prefixField = formData.get("prefix");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Falta el archivo a subir" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { message: "Solo se permiten imágenes PNG o JPG" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { message: "La imagen no puede pesar más de 4MB" },
        { status: 400 },
      );
    }

    const prefix =
      typeof prefixField === "string" && ALLOWED_PREFIXES.has(prefixField)
        ? prefixField
        : "misc";

    const url = await uploadImage(file, prefix);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
