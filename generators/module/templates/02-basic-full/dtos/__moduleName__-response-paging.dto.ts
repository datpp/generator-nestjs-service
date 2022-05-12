interface <%= kebabToPascal(config.name) %>ResponsePagingDto {
  next: string,
  total: number,
  data: object[],
}
