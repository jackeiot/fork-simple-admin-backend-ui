import { BasicColumn,FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
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
    title: t('pms.productOtaFirmware.push'),
    dataIndex: 'push',
    width: 80,
  },
];


export const formSchema: FormSchema[] = [
  {
    field: 'enabled',
    label: t('common.on'),
    component: 'Checkbox',
    defaultValue: false,
    // colProps: { span: 8 },
  },
  {
    field: 'type',
    label: t('dms.deviceConfig.type'),
    component: 'Select',
    // defaultValue: 1,
    componentProps: {
      options: [
        { label: t('PPTP'), value: "0" },
        { label: t('L2TP'), value: "1" },
        // { label: t('CHAP'), value: "2" },
        // { label: t('MS-CHAPv2'), value: "3" },
      ],
    },
    defaultValue: '0',
  },
  {
    field: 'remote_host',
    label: t('dms.deviceConfig.host'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'username',
    label: t('dms.deviceConfig.username'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'password',
    label: t('dms.deviceConfig.password'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'auth_type',
    label: t('dms.deviceConfig.authType'),
    component: 'RadioGroup',
    // defaultValue: 1,
    componentProps: {
      options: [
        { label: t('AUTO'), value: "0" },
        { label: t('PAP'), value: "1" },
        { label: t('CHAP'), value: "2" },
        { label: t('MS-CHAPv2'), value: "3" },
      ],
    },
    defaultValue: '0',
  },
  {
    field: 'mppe_type',
    label: t('dms.deviceConfig.pwdType'),
    component: 'RadioGroup',
    // defaultValue: 1,
    componentProps: {
      options: [
        { label: t('AUTO'), value: "0" },
        { label: t('MPPE-128'), value: "1" },
        { label: t('MPPE-48'), value: "2" },
        { label: t('NONE'), value: "3" },
      ],
    },
    defaultValue: '0',
  },
  {
    field: 'remote_lan',
    label: t('dms.deviceConfig.remoteLan'),
    component: 'Input',
    // colProps: { span: 8 },
    ifShow:false
  },
  {
    field: 'remote_mask',
    label: t('dms.deviceConfig.remoteMask'),
    component: 'Input',
    // colProps: { span: 8 },
    ifShow:false
  },

];
