/* eslint-disable @typescript-eslint/naming-convention */
import { APP_CONFIG } from '../../../../environments/environment';
import { PATH_ETL_SERVICE } from '../../../core/constants/constants';

export class EtlEndpoint {
  public static Extract = `${APP_CONFIG.urlService}${PATH_ETL_SERVICE.etlExtract}`;
  public static Transform = `${APP_CONFIG.urlService}${PATH_ETL_SERVICE.etlTransform}`;
  public static ReTransform = `${APP_CONFIG.urlService}${PATH_ETL_SERVICE.etlReTransform}`;
}
