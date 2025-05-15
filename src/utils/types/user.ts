export interface UserType {
  id: number
  name: string
  email: string
  phone: string
  username: string
  website: string
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
  address: {
    city: string
    street: string
    suite: string
  }
}
