import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { getProductInfoList } from '@/api/pms/productInfo';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.productOtaProfile.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.productOtaProfile.type'),
    dataIndex: 'type',
    width: 100,
  },
  {
    title: t('pms.productOtaFirmware.productName'),
    dataIndex: 'productName',
    width: 100,
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
    title: t('pms.productOtaProfile.userId'),
    dataIndex: 'userId',
    width: 100,
    ifShow:false,
  },
  {
    title: t('pms.productOtaProfile.userName'),
    dataIndex: 'userName',
    width: 100,    ifShow:false,
  },
  {
    title: t('pms.productOtaProfile.content'),
    dataIndex: 'content',
    width: 100,
  },
  {
    title: t('pms.productOtaProfile.description'),
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
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('pms.productOtaProfile.name'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'type',
    label: t('pms.productOtaProfile.type'),
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: 'LAN', value: 1 },
        { label: 'WIFI', value: 2},
        { label: 'VPN', value: 3},
        { label: 'Iot', value: 4},
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
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('pms.productOtaProfile.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: t('pms.productOtaProfile.type'),
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        { label: 'LAN', value:'LAN' },
        { label: 'WIFI', value: 'WIFI'},
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
    label: t('pms.productOtaProfile.userId'),
    component: 'Input',
    required: false,  ifShow: false,
  },
  {
    field: 'userName',
    label: t('pms.productOtaProfile.userName'),
    component: 'Input',
    required: false,  ifShow: false,
  },

  {
    field: 'content',
    label: t('pms.productOtaProfile.content'),
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'description',
    label: t('pms.productOtaProfile.description'),
    component: 'InputTextArea',
    required: false,
  },
];
