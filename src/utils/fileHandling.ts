/**
 * Utility to help manage file descriptors
 *
 * This helps prevent "Too many open files" errors by ensuring
 * proper cleanup of file resources
 */

import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";

// Cache for file contents to reduce repeated file operations
const fileCache = new Map<string, { content: string; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache TTL

/**
 * Safely reads a file with caching to reduce file operations
 * @param filePath Path to the file
 * @returns File contents as a string
 */
export async function safeReadFile(filePath: string): Promise<string> {
  // Normalize path to ensure consistent cache keys
  const normalizedPath = path.normalize(filePath);

  // Check cache first
  const now = Date.now();
  const cached = fileCache.get(normalizedPath);

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.content;
  }

  try {
    // Use fs.promises API which handles file descriptors internally
    const content = await fs.readFile(normalizedPath, { encoding: "utf-8" });

    // Cache the result
    fileCache.set(normalizedPath, { content, timestamp: now });

    return content;
  } catch (error) {
    console.error(`Error reading file ${normalizedPath}:`, error);
    throw error;
  }
}

/**
 * Wrapper for createReadStream that ensures proper cleanup
 * @param filePath Path to the file
 * @returns A readable stream
 */
export function createSafeReadStream(filePath: string) {
  // Normalize path to ensure consistency
  const normalizedPath = path.normalize(filePath);

  // Set high water mark to a lower value to reduce memory usage
  const stream = createReadStream(normalizedPath, {
    autoClose: true,
    highWaterMark: 16 * 1024, // 16KB chunks instead of default 64KB
  });

  // Track if the stream has been closed
  let isClosed = false;

  const closeStream = () => {
    if (!isClosed) {
      isClosed = true;
      stream.close();
    }
  };

  // Ensure the stream is properly closed on error
  stream.on("error", (err) => {
    console.error(`Stream error for ${normalizedPath}:`, err);
    closeStream();
  });

  // Ensure cleanup on end
  stream.on("end", closeStream);

  // Ensure cleanup if the stream is destroyed
  stream.on("close", closeStream);

  return stream;
}

/**
 * Clear the file cache to free memory
 */
export function clearFileCache(): void {
  fileCache.clear();
}
