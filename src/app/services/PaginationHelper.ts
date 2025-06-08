import { HttpParams, HttpResponse } from '@angular/common/http';
import { UserParams } from '../models/UserParams';
import { signal } from '@angular/core';
import { PaginatedResult } from '../models/Pagination';

export function setPaginatedResponse<T>(
  response: HttpResponse<T>,
  paginatedResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>
) {
  paginatedResultSignal.set({
    items: response.body as T,
    pagination: JSON.parse(response.headers.get('Pagination')!),
  });
}

export function setPaginationHeaders(userParams: UserParams) {
  let params = new HttpParams();

  if (userParams.pageNumber && userParams.pageSize) {
    params = params.append('pageNumber', userParams.pageNumber.toString());
    params = params.append('pageSize', userParams.pageSize.toString());
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  return params;
}
