import { ApiResourceNotFoundException } from '@library/api/core/error';
import { Error } from 'mongoose';

export function apiRepositoryError(): string {
  return 'api-repository-error';
}

export const handleDocumentNotFound = (error: Error): never => {
  if (error instanceof Error.DocumentNotFoundError) {
    throw new ApiResourceNotFoundException(error);
  }
  throw error;
}
