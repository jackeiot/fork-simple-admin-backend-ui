import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { getProductInfoList } from '@/api/pms/productInfo';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.productOtaFirmware.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.version'),
    dataIndex: 'version',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.fileName'),
    dataIndex: 'fileName',
    width: 300,
  },
  {
    title: t('pms.productOtaFirmware.fileUrl'),
    dataIndex: 'fileUrl',
    width: 100,ifShow:false,
  },
  {
    title: t('pms.productOtaFirmware.fileMd5'),
    dataIndex: 'fileMd5',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.fileSize'),
    dataIndex: 'fileSize',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.productName'),
    dataIndex: 'productName',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.productCode'),
    dataIndex: 'productCode',
    width: 100,
    ifShow:false
  },
  {
    title: t('pms.productOtaFirmware.zoneType'),
    dataIndex: 'zoneType',
    width: 100,
    customRender: ({ record }) => {
       if (record.zoneType == 2) {
        return t('pms.common.private')
       } else {
        return t('pms.common.common')
       };
    },
  },
  {
    title: t('pms.productOtaFirmware.saveType'),
    dataIndex: 'saveType',
    width: 100,ifShow:false,
  },
  {
    title: t('pms.productOtaFirmware.userId'),
    dataIndex: 'userId',
    width: 100,ifShow:false,
  },
  {
    title: t('pms.productOtaFirmware.userName'),
    dataIndex: 'userName',
    width: 100,ifShow:false,
  },
  {
    title: t('pms.productOtaFirmware.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.upload'),
    dataIndex: 'upload',
    width: 80,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('pms.productOtaFirmware.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'zoneType',
    label: t('pms.common.zone'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: t('pms.common.all'), value: 0 },
        { label: t('pms.common.common'), value: 1 },
        { label: t('pms.common.private'), value: 2},
      ],
    },
  },
  {
    field: 'productId',
    label: t('pms.productOtaFirmware.productName'),
    component: 'ApiSelect',
    componentProps: {
      api: getProductInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'productName',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('pms.productOtaFirmware.name'),
    component: 'Input',
    required: true, ifShow:false
  },
  {
    field: 'name',
    label: t('pms.productOtaFirmware.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'productId',
    label: t('pms.productOtaFirmware.productName'),
    component: 'ApiSelect',
    componentProps: {
      api: getProductInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'productName',
      valueField: 'id',
    },
    rules: [{ required: true, message: '请选择产品ID' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'zoneType',
    label: t('pms.common.zone'),
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        { label: t('pms.common.common'), value: 1 },
        { label: t('pms.common.private'), value: 2},
      ],
    },
  },
  {
    field: 'userId',
    label: t('pms.productOtaFirmware.userId'),
    component: 'Input',
    required: false, ifShow:false
  },
  {
    field: 'version',
    label: t('pms.productOtaFirmware.version'),
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: t('pms.productOtaFirmware.description'),
    component: 'InputTextArea',
    required: false,
  },

];
