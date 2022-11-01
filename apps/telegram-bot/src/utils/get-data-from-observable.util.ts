import { Observable } from 'rxjs';

export const getDataFromObservableUtil = <Type>(
  data: Observable<Type>,
): Promise<Type> => {
  return new Promise((resolve) => {
    data.subscribe((response: Type) => {
      resolve(response);
    });
  });
};
