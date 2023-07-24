import { Repository } from '@/infrastructure/repository'
import type { IFlightBriefingFilter, IFlightBriefingResponse } from './model'
import { API } from './constants'

export const flightBriefingRepository = new Repository<
  IFlightBriefingFilter,
  IFlightBriefingResponse
>(API.OPMET)
