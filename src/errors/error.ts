export function notFoundError(item: string | undefined): object {
  return {
    name: 'NotFoundError',
    message: `${item ?? 'It'} was not found`,
  }
}

export function conflictError(item: string | undefined): object {
  return {
    name: 'ConflictError',
    message: `${item ?? 'It'} already exists!`,
  }
}
export function unauthorizedError(item: string | undefined): object {
  return {
    name: 'UnauthorizedError',
    message: `${item ?? ''} Access Unauthorized!`,
  }
}
export function UnprocessableEntityError(
  item: string[] | string | undefined,
): object {
  return {
    name: 'UnprocessableEntityError',
    message: item ?? 'Unprocessable Entity!',
  }
}
