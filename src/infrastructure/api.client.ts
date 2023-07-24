import type { IApiClient, MethodType } from './api.client.interface'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const enum HttpStatusCodes {
  Ok = 200,
  Created = 201,
  NoContent = 204
}

export class ApiClient<T> implements IApiClient<T> {
  constructor(url: string) {
    this.url = url
  }

  private url: string

  private async send(request: RequestInit): Promise<T> {
    const defaults = {
      headers
    }

    const init = Object.assign({}, defaults, request)

    const response = await fetch(this.url, init)

    if (response.status === HttpStatusCodes.NoContent) {
      return Promise.resolve(null as T)
    } else {
      return response.json()
    }
  }

  fetch(filter: any, method: MethodType = 'GET'): Promise<T> {
    const body = typeof filter === 'object' ? JSON.stringify(filter) : filter

    const request: RequestInit = {
      method,
      body
    }

    return this.send(request)
  }
}
