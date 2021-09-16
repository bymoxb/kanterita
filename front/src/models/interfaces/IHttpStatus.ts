interface IHttpStatus<T> {
  ok: boolean,
  payload: T,
  message?: string[]
}

export default IHttpStatus;
