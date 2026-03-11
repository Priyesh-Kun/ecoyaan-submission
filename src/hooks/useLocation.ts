"use client";

import { useState, useEffect } from "react";

interface LocationData {
  city: string;
  pincode: string;
  loading: boolean;
}

export function useLocation(): LocationData {
  const [location, setLocation] = useState<LocationData>({
    city: "Detecting...",
    pincode: "",
    loading: true,
  });

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setLocation({
          city: data.city || "India",
          pincode: data.postal || "",
          loading: false,
        });
      })
      .catch(() => {
        setLocation({ city: "India", pincode: "", loading: false });
      });
  }, []);

  return location;
}