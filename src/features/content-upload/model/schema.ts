import { z } from "zod";

export const TAG_OPTIONS = ["Fashion", "Beauty", "F&B"] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const contentUploadSchema = z.object({
  url: z.url({ message: "올바른 URL을 입력해주세요" }),
  image: z
    .instanceof(File, { message: "이미지를 업로드해주세요" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "이미지 크기는 5MB 이하여야 합니다",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "JPG, PNG, GIF, WebP 형식만 지원합니다",
    }),
  productName: z
    .string()
    .min(1, { message: "상품명을 입력해주세요" })
    .max(100, { message: "상품명은 100자 이하로 입력해주세요" }),
  description: z
    .string()
    .max(500, { message: "설명은 500자 이하로 입력해주세요" })
    .optional(),
  tags: z
    .array(z.string())
    .min(1, { message: "최소 1개의 태그를 선택해주세요" }),
});

export type ContentUploadFormData = z.infer<typeof contentUploadSchema>;
