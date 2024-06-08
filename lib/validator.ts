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
    
    url: z.string().url(),

    numberOfTickets: z.string().min(15, "number of tickets cannot be less than 15"),

    termsagreement: z.literal<boolean>(true, { errorMap: () => ({message: "Only events that  agree to our terms can be displayed on the website",}),}),

    performersReg: z.boolean()

  });


  export const performerFormSchema = z.object({
    
    eventId: z.string(),

    performanceType: z.enum(['spoken word', 'musical performance']),

    fullName: z.string().min(3, "You name must be at least 3 characters"),

    performanceDetails: z.string().min(3, "Performance details must be at least 3 characters"),

    funFact: z.string().min(3, "Fun fact must be at least 3 characters").max(140, "Fun fact must be less than 140 characters"),
    
    email: z.string().min(4, "Email must be longer than 3 characters"),

    phoneNumber: z.string().min(8, "Phone number must be minimum 8 digits"),

    performanceLanguage: z.string().min(3, "Language name should be more than 3 chatacters"),

    idScan_url: z.string().url(),

    soloOrGroup: z.enum(['solo', 'Band']),

    termsagreement: z.literal<boolean>(true, { errorMap: () => ({message: "Must agree to the terms if you would like to perform",}),}),


  });






  
  