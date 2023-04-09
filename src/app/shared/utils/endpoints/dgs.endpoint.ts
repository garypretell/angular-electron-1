/* eslint-disable @typescript-eslint/naming-convention */
import { APP_CONFIG } from '../../../../environments/environment';
import { PATH_DGS_SERVICE } from '../../../core/constants/constants';

export class DgsEndpoint {
  public static GetDgsByDonor = `${APP_CONFIG.urlService}${PATH_DGS_SERVICE.dgs}{donorId}`;
  public static GetDgsByOid = `${APP_CONFIG.urlService}${PATH_DGS_SERVICE.dgs}oid/{oidDgs}`;
  public static UpdateDgs = `${APP_CONFIG.urlService}${PATH_DGS_SERVICE.dgs}{oidDgs}`;
  public static UpdateDgsbyFolderStatus = `${APP_CONFIG.urlService}${PATH_DGS_SERVICE.dgs}update/{oidDgs}`;
}
