import { z } from "zod";

export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3,  "Event description must be at least 3 characters").max(500, "Description must be less than 500 characters"),
    
    location: z.string().min(3, "Event description must be at least 3 characters").max(500, "location must be less than 500 characters"),
    
    imageUrl: z.string().url(),
    
    startDateTime: z.date(),
    
    endDateTime: z.date(),
    
    categoryId: z.string(),
    
    price: z.string(),
    
    isFree: z.boolean(),
    
    url:z.string().url(),

  });

  export default eventFormSchema;