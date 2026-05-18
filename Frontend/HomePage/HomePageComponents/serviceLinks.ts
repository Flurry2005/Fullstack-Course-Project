export function getServicesSearchLink(search: string) {
  const params = new URLSearchParams({ search });
  return `/services?${params.toString()}`;
}

export function getServicesCategoryLink(category: string) {
  const params = new URLSearchParams({ categories: category });
  return `/services?${params.toString()}`;
}
