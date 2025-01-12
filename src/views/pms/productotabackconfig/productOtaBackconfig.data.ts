import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { getProductInfoList } from '@/api/pms/productInfo';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.productOtaBackconfig.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.productOtaBackconfig.fileName'),
    dataIndex: 'fileName',
    width: 100,
  },
  {
    title: t('pms.productOtaBackconfig.fileUrl'),
    dataIndex: 'fileUrl',
    width: 100,
    ifShow:false,
  },
  {
    title: t('pms.productOtaBackconfig.fileMd5'),
    dataIndex: 'fileMd5',ifShow:false,
    width: 100,
  },
  {
    title: t('pms.productOtaBackconfig.fileSize'),
    dataIndex: 'fileSize',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.productName'),
    dataIndex: 'productName',
    width: 100,
  },
  {
    title: t('pms.productOtaBackconfig.zoneType'),
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
    title: t('pms.productOtaBackconfig.saveType'),
    dataIndex: 'saveType',ifShow:false,
    width: 100,
  },
  {
    title: t('pms.productOtaBackconfig.userId'),
    dataIndex: 'userId',
    width: 100,ifShow:false,
  },
  {
    title: t('pms.productOtaBackconfig.userName'),
    dataIndex: 'userName',
    width: 100,
  },
  {
    title: t('pms.productOtaBackconfig.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: t('pms.productOtaFirmware.upload'),
    dataIndex: 'upload',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('pms.productOtaBackconfig.name'),
    component: 'Input',
    colProps: { span: 8 },
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
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('pms.productOtaBackconfig.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'fileName',
    label: t('pms.productOtaBackconfig.fileName'),
    component: 'Input',
    show: false,
  },
  {
    field: 'fileUrl',
    label: t('pms.productOtaBackconfig.fileUrl'),
    component: 'Input',
    show: false,
  },
  {
    field: 'fileMd5',
    label: t('pms.productOtaBackconfig.fileMd5'),
    component: 'Input',
    show: false,
  },
  {
    field: 'fileSize',
    label: t('pms.productOtaBackconfig.fileSize'),
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'productId',
    label: t('pms.productOtaBackconfig.productName'),
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
    field: 'saveType',
    label: t('pms.productOtaBackconfig.saveType'),
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'userId',
    label: t('pms.productOtaBackconfig.userId'),
    component: 'Input',
    required: false, show: false,
  },
  {
    field: 'userName',
    label: t('pms.productOtaBackconfig.userName'),
    component: 'Input',
    show: false,
  },
  {
    field: 'description',
    label: t('pms.productOtaBackconfig.description'),
    component: 'Input',
    required: false,
  },
];
