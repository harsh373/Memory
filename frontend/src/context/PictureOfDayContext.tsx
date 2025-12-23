import { createContext, useContext, useEffect, useState } from "react";
import { fetchPictureOfDay, type PictureOfDay } from "../api/pictureOfDay.api";

type PictureOfDayContextType = {
  data: PictureOfDay | null;
  loading: boolean;
};

const PictureOfDayContext = createContext<PictureOfDayContextType | null>(null);

export function PictureOfDayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<PictureOfDay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPictureOfDay()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <PictureOfDayContext.Provider value={{ data, loading }}>
      {children}
    </PictureOfDayContext.Provider>
  );
}

export function usePictureOfDay() {
  const ctx = useContext(PictureOfDayContext);
  if (!ctx) {
    throw new Error(
      "usePictureOfDay must be used inside PictureOfDayProvider"
    );
  }
  return ctx;
}
