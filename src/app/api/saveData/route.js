import fs from "fs";
import path from "path";

/**
 * Handles POST requests to save data to a file in the public directory.
 *
 * Expects a JSON body with the following properties:
 * - filepath {string}: The relative path to the directory within the public folder.
 *   Example: "datas" or "images".
 * - fileName {string}: The name of the file to save.
 * - data {Array}: The data to be saved in the file.
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<Response>} A response indicating success or failure.
 */
export async function POST(request) {
  try {
    const { _filepath, fileName, data } = await request.json();

    if (!fileName || !Array.isArray(data)) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      });
    }

    const publicDir = path.join(process.cwd(), "public", _filepath);
    const filePath = path.join(publicDir, fileName);

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
