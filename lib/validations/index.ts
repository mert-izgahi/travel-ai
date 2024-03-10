import { z } from "zod";

export const placeInputSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    latitude: z.number(),
    longitude: z.number(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    images: z.array(z.string()).min(1, "Images are required"),
});
