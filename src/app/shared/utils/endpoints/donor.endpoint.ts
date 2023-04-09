/* eslint-disable @typescript-eslint/naming-convention */
import { APP_CONFIG } from '../../../../environments/environment';

export class DonorEndpoint {
  public static GetDonorsProxy = `${APP_CONFIG.urlService}donors`;
  public static GetDonorsByIdProxy = `${APP_CONFIG.urlService}donors/{donorId}`;
  public static UpdateDonor = `${APP_CONFIG.urlService}donors/{donorId}`;
}
