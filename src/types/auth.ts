export type Refresh = {
  access_token: string,
  token_type: 'Bearer',
}

type Register<T> = {
  username: string,
  surname: string,
  name: string,
  patronymic: string,
} & T

type Body = {
  username: string,
  password: string,
}

type RequestBody = {
  id: string,
  role: 'user',
  is_archived: boolean
}

export type RegisterBodyRequest = Register<Body>
export type RegisterResponse = Register<RequestBody>
