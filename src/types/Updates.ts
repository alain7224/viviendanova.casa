export interface UpdatePatch {
  id: string;
  version: string;
  description: string;
  changes: string[];
  fileSize: number;
  downloadUrl: string;
  checksum: string;
  releaseDate: string;
  status: 'pending' | 'installing' | 'installed' | 'failed';
  rollbackAvailable: boolean;
}
