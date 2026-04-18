import { z } from 'zod';
import { formatFileSize } from './formatters';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
const ALLOWED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg'];

function hasAllowedExtension(fileName = '') {
  const normalizedName = fileName.toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.some((extension) => normalizedName.endsWith(extension));
}

export function validateImageFile(file) {
  if (!file) {
    return 'Please choose an image file first.';
  }

  const hasValidType = ALLOWED_IMAGE_TYPES.includes(file.type) || hasAllowedExtension(file.name);

  if (!hasValidType) {
    return 'Please upload a PNG, JPG, JPEG, or SVG image.';
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `File size must be 10MB or less. Current size: ${formatFileSize(file.size)}.`;
  }

  return '';
}

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean().default(false),
});

export const loginDefaultValues = {
  email: '',
  password: '',
  rememberMe: false,
};

export const violationSchema = z.object({
  brand: z.string().trim().min(1, 'Brand is required.'),
  source: z.enum(['website', 'social', 'marketplace', 'other']),
  url: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: 'Source URL must start with http:// or https://',
    }),
  notes: z.string().trim().max(1000, 'Notes must be 1000 characters or less.').optional(),
});

export const violationDefaultValues = {
  brand: '',
  source: 'website',
  url: '',
  notes: '',
};
