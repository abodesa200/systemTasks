"use client";
import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";

const GetProfile = () => {
  const { fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return null; 
};

export default GetProfile;
