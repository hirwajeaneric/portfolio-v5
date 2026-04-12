import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  tags?: string[];
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  resource_type: string;
}

export async function uploadImage(
  file: Buffer | string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      resource_type: "image",
      ...(options.folder && { folder: options.folder }),
      ...(options.publicId && { public_id: options.publicId }),
      ...(options.tags && { tags: options.tags }),
    };

    if (Buffer.isBuffer(file)) {
      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result as UploadResult);
        else reject(new Error("Upload failed"));
      });
      stream.end(file);
    } else {
      cloudinary.uploader.upload(file, uploadOptions, (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result as UploadResult);
        else reject(new Error("Upload failed"));
      });
    }
  });
}

export type ListedCloudinaryImage = {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
};

/**
 * List or search image uploads (Admin API). Used by the CMS media library and asset picker.
 */
export async function listCloudinaryImages(options: {
  prefix?: string;
  maxResults?: number;
  nextCursor?: string | null;
  search?: string;
}): Promise<{
  resources: ListedCloudinaryImage[];
  next_cursor?: string;
  total_count?: number;
}> {
  const maxResults = Math.min(Math.max(options.maxResults ?? 24, 1), 100);
  const search = options.search?.trim();

  if (search) {
    const safe = search.replace(/[^a-zA-Z0-9_\-\s.]/g, "").slice(0, 80);
    let expression = "resource_type:image";
    if (options.prefix) {
      expression += ` AND folder:${options.prefix}*`;
    }
    if (safe) {
      expression += ` AND (public_id:*${safe}* OR filename:*${safe}*)`;
    }

    let chain = cloudinary.search.expression(expression).max_results(maxResults).sort_by("created_at", "desc");
    if (options.nextCursor) {
      chain = chain.next_cursor(options.nextCursor);
    }
    const res = (await chain.execute()) as {
      resources?: Array<{
        public_id: string;
        secure_url: string;
        format?: string;
        width?: number;
        height?: number;
        bytes?: number;
        created_at?: string;
      }>;
      next_cursor?: string;
      total_count?: number;
    };

    const resources = (res.resources ?? []).map((r) => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      format: r.format ?? "",
      width: r.width ?? 0,
      height: r.height ?? 0,
      bytes: r.bytes ?? 0,
      created_at: r.created_at ?? "",
    }));

    return { resources, next_cursor: res.next_cursor, total_count: res.total_count };
  }

  return new Promise((resolve, reject) => {
    cloudinary.api.resources(
      {
        resource_type: "image",
        type: "upload",
        max_results: maxResults,
        ...(options.prefix ? { prefix: options.prefix } : {}),
        ...(options.nextCursor ? { next_cursor: options.nextCursor } : {}),
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        type ApiResource = {
          public_id: string;
          secure_url: string;
          format?: string;
          width?: number;
          height?: number;
          bytes?: number;
          created_at?: string;
        };
        const resources = (result?.resources ?? []).map((r: ApiResource) => ({
          public_id: r.public_id,
          secure_url: r.secure_url,
          format: r.format ?? "",
          width: r.width ?? 0,
          height: r.height ?? 0,
          bytes: r.bytes ?? 0,
          created_at: r.created_at ?? "",
        }));
        resolve({
          resources,
          next_cursor: result?.next_cursor,
        });
      }
    );
  });
}

export async function uploadRaw(
  file: Buffer,
  options: UploadOptions & { resource_type?: "image" | "raw" | "auto" } = {}
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      resource_type: options.resource_type ?? "auto",
      ...(options.folder && { folder: options.folder }),
    };
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) reject(error);
      else if (result) resolve(result as UploadResult);
      else reject(new Error("Upload failed"));
    });
    stream.end(file);
  });
}
