import { StatusPipe } from '../../shared/pipes/status.pipe';
import { ITableColumn } from '../../core/interfaces/table.interface';

export const FILTER_NOT_FOUND: any = {
  message: 'No existen resultados para esta búsqueda.',
};

export const FOLDER_STATUS: any[] = [
  { key: 'R', display: 'Registrado' },
  { key: 'X', display: 'Por Procesar' },
  { key: 'D', display: 'DGS ya fue cargado' },
  { key: 'E', display: 'No listo para procesar' },
  { key: 'P', display: 'Procesando' },
  { key: 'T', display: 'Terminado' },
  { key: 'A', display: 'Anulado' },
];

export const DGS_STATUS: any[] = [
  { key: 'R', display: 'Registrado' },
  { key: 'X', display: 'Por Procesar' },
  { key: 'D', display: 'DGS ya fue cargado' },
  { key: 'E', display: 'No listo para procesar' },
  { key: 'P', display: 'Procesando' },
  { key: 'T', display: 'Terminado' },
  { key: 'A', display: 'Anulado' },
];

export const PATH_DONOR_SERVICE: any = {
  find: 'api/v0/donors',
};

export const PATH_DGS_SERVICE: any = {
  dgs: 'dgs/'
};

export const NUM_THREADS = 10;

export const PATH_ETL_SERVICE: any = {
  etlExtract: 'etl/extract',
  etlTransform: 'etl/transform',
  etlReTransform: 'etl/retransform'
};

export const DONOR_TABLE: ITableColumn[] = [
  { key: 'donorName', display: 'Nombre' },
  { key: 'totalDgs', display: 'Total Carpetas', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  { key: 'totalDgsOk', display: 'Total Carp. Ok', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  { key: 'totalDgsErr', display: 'Total Carp. Error', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  { key: 'totalImage', display: 'Total Imágenes', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  {
    key: 'dateLoad',
    display: 'Fecha Carga',
    config: {
      isDate: true,
      format: 'yyyy/MM/dd',
    }
  },
  {
    key: 'dateProcess',
    display: 'Fecha Cambio',
    config: {
      isDate: true,
      format: 'yyyy/MM/dd',
    },
  },
  {
    key: 'status',
    display: 'Estado',
    config: {
      isDynamicPipe: true,
      myPipe: StatusPipe
    },
  },
  {
    key: 'action',
    display: 'Accion',
    config: {
      isAction: true,
      actions: [
        {
          isSvg: true,
          width: 20,
          height: 20,
          title: 'Editar',
          classIcon: 'fa-solid fa-file-pen',
          styles:
            'text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800',
        },
        {
          isSvg: true,
          width: 20,
          height: 20,
          title: 'Eliminar',
          classIcon: 'fa-solid fa-trash',
          styles:
            'text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800',
        },
        {
          isSvg: true,
          width: 20,
          height: 20,
          title: 'Procesar',
          classIcon: 'fa-solid fa-circle-arrow-up',
          styles:
            'text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800',
        },
        {
          isSvg: true,
          width: 20,
          height: 20,
          title: 'Reprocesar',
          classIcon: 'fa-solid fa-file-import',
          styles:
            'text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
        },
      ],
    },
  },
];

export const DGS_TABLE: ITableColumn[] = [
  { key: 'dgs', display: 'Id Carpeta' },
  { key: 'archiveReferenceNumber', display: 'Numero Referencia' },
  { key: 'fsFolderName', display: 'Carpeta Origen' },
  { key: 'archiveFolderName', display: 'Carpeta Destino' },
  { key: 'recordDatesStandard', display: 'Rango Fecha' },
  { key: 'placeTerm', display: 'Place' },
  { key: 'totalImage', display: 'Total Imagen', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  { key: 'totalImageOk', display: 'Total Img Ok', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  { key: 'totalImageErr', display: 'Total Img Err', config: {
    isNumber: true,
    format: '0.0-0'
  } },
  {
    key: 'status',
    display: 'Estado',
    config: {
      isDynamicPipe: true,
      myPipe: StatusPipe
    },
  },
  {
    key: 'action',
    display: 'Accion',
    config: {
      isAction: true,
      actions: [
        {
          isSvg: true,
          width: 20,
          height: 20,
          title: 'Editar',
          classIcon: 'fa-solid fa-file-pen',
          styles:
            'text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800',
        },
        {
          isSvg: true,
          width: 20,
          height: 20,
          title: 'Eliminar',
          classIcon: 'fa-solid fa-trash',
          styles:
            'text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800',
        },
      ],
    },
  },
];
