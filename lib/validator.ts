import { z } from "zod";

export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3,  "Event description must be at least 3 characters").max(800, "Description must be less than 800 characters"),
    
    location: z.string().min(3, "Event description must be at least 3 characters").max(500, "location must be less than 500 characters"),
    
    imageUrl: z.string().url(),
    
    startDateTime: z.date(),
    
    endDateTime: z.date(),
    
    categoryId: z.string(),
    
    price: z.string(),
    
    isFree: z.boolean(),
    
    url: z.string().url(),

    numberOfTickets: z.number().min(10, "number of tickets cannot be less than 15"),

    termsagreement: z.literal<boolean>(true, { errorMap: () => ({message: "Only events that  agree to our terms can be displayed on the website",}),}),

    performersReg: z.boolean(),
    ticketsRegistration: z.boolean()

  });


  export const performerFormSchema = z.object({
    
    performanceType: z.enum(['spoken word', 'musical performance']),

    fullName: z.string().min(3, "You name must be at least 3 characters"),

    performanceDetails: z.string().min(3, "Performance details must be at least 3 characters"),

    funFact: z.string().min(3, "Fun fact must be at least 3 characters").max(400, "Fun fact must be less than 400 characters"),
    
    email: z.string().min(4, "Email must be longer than 3 characters"),

    phoneNumber: z.string().min(8, "Phone number must be minimum 8 digits"),

    performanceLanguage: z.string().min(3, "Language name should be more than 3 chatacters"),

    imgUrl: z.string().url(),

    soloOrGroup: z.enum(['solo', 'band']),

    termsAgreement: z.literal<boolean>(true, { errorMap: () => ({message: "Must agree to the terms if you would like to perform",}),}),


  });






  
  