export declare type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IApiClient<T> {
  fetch(filter: any, method: MethodType): Promise<T>
}
