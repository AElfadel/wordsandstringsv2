
// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
    role: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
    role: string
  }
  
  // ====== EVENT PARAMS
  export type CreateEventParams = {
    userId: string
    event: {
      title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
      numberOfTickets: number
      termsagreement: boolean
      performersReg: boolean
      ticketsRegistration: boolean
    }
    path: string
  }
  
  export type UpdateEventParams = {
    userId: string
    event: {
      _id: string
      title: string
      imageUrl: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
      numberOfTickets: number
      performersReg: boolean
      termsagreement: boolean
      ticketsRegistration: boolean
    }
    path: string
  }
  
  export type DeleteEventParams = {
    eventId: string,
    path: string,
    imageUrl: string
  }
  
  export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: string
  }

  export type getActiveEventsParams = {
    query?: string
    category?: string
    limit: number
    page?: string
  }
  
  export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
  }
  
  export type Event = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
    numberOfTickets: string
    termsagreement: boolean
    performersReg: boolean
  }

  // ====== PERFORMER PARAMS
  export type performerSignupProps ={
    userId: string
    performer: {
      fullName: string
   
      funFact: string
      
      imgUrl: string
  
      phoneNumber: string
  
      termsAgreement: boolean,
  
      eventId: string
  
      performanceDetails: string
  
      performanceType: "spoken word" | "musical performance"
  
      performanceLanguage: string
      soloOrGroup: "solo"  | "band"
    }
    eventId: string
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
    ticketQuantity: string
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }