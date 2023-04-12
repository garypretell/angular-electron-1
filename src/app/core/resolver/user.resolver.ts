import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { PATH_URL_DATA } from '../../core/constants/routes';
import { DonorService } from '../../core/services/donor.service';

export const userResolver: ResolveFn<boolean> = (route, state) => {

  const donorService = inject(DonorService);
  const router = inject(Router);
  const id = route.params.id;

  return donorService.getDonorById({donorId: +id}).pipe(
    map((data: any) => data),
    catchError((error) => {
      router.navigate([PATH_URL_DATA.urlUserList], { replaceUrl: true });
      return of(error);
    })
  );
};
