export interface LocalData {
  Results: Result[]
}

export interface Result {
  Relevance: number
  longitude: number
  latitude: number
  address: string
  addressnumber?: string
  street?: string
  city: string
  region?: string
  subregion?: string
  country: string
  postalcode?: string
}
