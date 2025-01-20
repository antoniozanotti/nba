export type NBAGetResponseType<T> = {
  data: T;
  meta: {
    next_cursor: number;
    per_page: number;
  };
};
