import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug'); // Get the slug from query parameters

    const jsonFilePath = path.join(process.cwd(), 'src/app/api/projects/projects.json');
    
    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    
    // Parse the JSON data
    const projects = JSON.parse(jsonData);

    // If a slug is provided, filter the projects
    if (slug) {
        const project = projects.find((p: { slug: string }) => p.slug === slug);
        return NextResponse.json(project || { message: 'Project not found' });
    }

    // Return all projects if no slug is provided
    return NextResponse.json(projects);
}
