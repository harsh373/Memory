import api from "./axios";

export type Photo = {
  _id: string;
  imageUrl: string;
  eventId: string;
  uploadedAt: string;
};

export const fetchPhotosByEventId = async (
  eventId: string
): Promise<Photo[]> => {
  const res = await api.get(`/photos/${eventId}`);
  return res.data;
};



export const uploadPhotos = async (eventId: string, files: File[]) => {
  const formData = new FormData();
  formData.append("eventId", eventId);
  files.forEach((file) => formData.append("photos", file));

  const res = await api.post("/photos", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};
