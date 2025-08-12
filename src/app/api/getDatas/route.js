import fs from "fs";
import path from "path";

/**
 * Handles GET requests to retrieve file data from the public directory.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<Response>} - A promise that resolves to a Response object containing the file data or an error message.
 *
 * @throws {Response} 400 - If the 'filepath' query parameter is missing.
 * @throws {Response} 404 - If the specified file does not exist.
 * @throws {Response} 500 - If an unexpected error occurs during file reading.
 */
export async function GET(request) {
  try {
    const filepath = request.nextUrl.searchParams.get("filepath");
    console.log("Fetching file:", filepath);
    if (!filepath) {
      return new Response(JSON.stringify({ error: "Filepath is required" }), {
        status: 400,
      });
    }

    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, filepath);

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "File not found" }), {
        status: 404,
      });
    }

    const data = await fs.promises.readFile(filePath, "utf8");
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
