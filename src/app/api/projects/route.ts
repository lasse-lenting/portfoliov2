import { NextResponse } from "next/server";
import path from "path";
import { safeReadFile } from "@/utils/fileHandling";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug"); // Get the slug from query parameters

  const jsonFilePath = path.join(
    process.cwd(),
    "src/app/api/projects/projects.json",
  );

  try {
    // Use a cached version if available to reduce file operations
    const jsonData = await safeReadFile(jsonFilePath);

    // Parse the JSON data
    const projects = JSON.parse(jsonData);

    // If a slug is provided, filter the projects
    if (slug) {
      const project = projects.find((p: { slug: string }) => p.slug === slug);
      return NextResponse.json(project || { message: "Project not found" });
    }

    // Return all projects if no slug is provided
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error reading projects file:", error);
    return NextResponse.json(
      { message: "Error loading projects" },
      { status: 500 },
    );
  }
}
