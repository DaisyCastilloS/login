export interface SQLDatabaseWrapperInterface {
  query(queryString: string, params?: any[]): Promise<{ rows: any[] }>;
}
