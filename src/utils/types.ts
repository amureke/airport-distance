export type Airport = {
  AirportCode: string
  AirportName: string
  CountryCode: string
  city: string
  citycode: string
  cityunicode: string
  country: string
  id: string
  isActive: boolean
  lat: number
  long: number
  timezone: string
  zone: string
}

export enum AirportType {
  Start,
  Dest
}