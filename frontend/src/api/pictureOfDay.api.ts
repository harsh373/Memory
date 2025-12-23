import api from "./axios";

export type PictureOfDay = {
  imageUrl: string;
  eventName: string;
  year: number;
  date: string; 
};

export const fetchPictureOfDay = async (): Promise<PictureOfDay | null> => {
  const res = await api.get("/picture-of-the-day");
  return res.data;
};

export const regeneratePictureOfDay = async (): Promise<void> => {
  await api.post("/picture-of-the-day/regenerate");
};
