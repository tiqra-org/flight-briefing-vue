import { type IRepository } from './repository.interface'
import { ApiClient } from './api.client'
import type { ICommonFilter } from './common.filter'
import type { ICommonResponse } from './common.response'
import type { IApiClient, MethodType } from './api.client.interface'

export class Repository<F extends ICommonFilter, T extends ICommonResponse>
  implements IRepository<F, T>
{
  constructor(url: string) {
    this.apiClient = new ApiClient<T>(url)
  }

  private apiClient: IApiClient<T>

  fetch(filter: F, method: MethodType = 'GET'): Promise<T> {
    return this.apiClient.fetch(filter, method)
  }
}
