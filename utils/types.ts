/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number;
  height: string;  // todo to remove
  width: string; // todo to remove
  public_id: string;
  public_url: string;
  format: string;
  blurDataUrl?: string;
  prompt?: string;
  promColors?: string[];
  created_at?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
  prompt?: string;
}

export interface searchResultsProps {
  index: number;
  name: string;
  id: number;
}