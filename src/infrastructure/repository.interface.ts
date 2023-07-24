import type { MethodType } from './api.client.interface'
import type { ICommonFilter } from './common.filter'
import type { ICommonResponse } from './common.response'

export interface IRepository<F extends ICommonFilter, T extends ICommonResponse> {
  fetch(filter: F, method: MethodType): Promise<T>
}
