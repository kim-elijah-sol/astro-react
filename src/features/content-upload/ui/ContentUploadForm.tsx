import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contentUploadSchema,
  TAG_OPTIONS,
  type ContentUploadFormData,
} from "../model/schema";
import styles from "./ContentUploadForm.module.css";

export function ContentUploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContentUploadFormData>({
    resolver: zodResolver(contentUploadSchema),
    mode: "onChange",
  });

  const selectedTags = watch("tags") || [];

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setValue("tags", newTags, { shouldValidate: true });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", undefined as unknown as File, { shouldValidate: true });
    setImagePreview(null);
  };

  const onSubmit = (data: ContentUploadFormData) => {
    console.log("Submitted data:", data);
    alert("콘텐츠가 업로드되었습니다!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>콘텐츠 업로드</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="url">
          URL<span className={styles.required}>*</span>
        </label>
        <input
          id="url"
          type="text"
          className={`${styles.input} ${errors.url ? styles.error : ""}`}
          placeholder="https://example.com/product"
          {...register("url")}
        />
        {errors.url && (
          <p className={styles.errorMessage}>{errors.url.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.label}>
          이미지<span className={styles.required}>*</span>
        </span>
        <div
          className={`${styles.imageUploadArea} ${errors.image ? styles.error : ""} ${imagePreview ? styles.hasImage : ""}`}
        >
          <input
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className={styles.fileInput}
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className={styles.previewContainer}>
              <img
                src={imagePreview}
                alt="미리보기"
                className={styles.previewImage}
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={handleRemoveImage}
                aria-label="이미지 삭제"
              >
                ×
              </button>
            </div>
          ) : (
            <>
              <svg
                className={styles.uploadIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className={styles.uploadText}>클릭하여 이미지 업로드</p>
              <p className={styles.uploadHint}>JPG, PNG, GIF, WebP (최대 5MB)</p>
            </>
          )}
        </div>
        {errors.image && (
          <p className={styles.errorMessage}>{errors.image.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="productName">
          상품명<span className={styles.required}>*</span>
        </label>
        <input
          id="productName"
          type="text"
          className={`${styles.input} ${errors.productName ? styles.error : ""}`}
          placeholder="상품명을 입력하세요"
          {...register("productName")}
        />
        {errors.productName && (
          <p className={styles.errorMessage}>{errors.productName.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="description">
          설명
        </label>
        <textarea
          id="description"
          className={`${styles.input} ${styles.textarea} ${errors.description ? styles.error : ""}`}
          placeholder="상품 설명을 입력하세요 (선택사항)"
          {...register("description")}
        />
        {errors.description && (
          <p className={styles.errorMessage}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.tagGroup}>
        <span className={styles.tagLabel}>
          태그<span className={styles.required}>*</span>
        </span>
        <div className={styles.tagOptions}>
          {TAG_OPTIONS.map((tag) => (
            <label key={tag} className={styles.tagOption}>
              <input
                type="checkbox"
                className={styles.tagCheckbox}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
              <span className={styles.tagButton}>{tag}</span>
            </label>
          ))}
        </div>
        {errors.tags && (
          <p className={styles.errorMessage}>{errors.tags.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "업로드 중..." : "업로드"}
      </button>
    </form>
  );
}
