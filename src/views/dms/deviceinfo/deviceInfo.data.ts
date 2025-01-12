import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getProductInfoList } from '@/api/pms/productInfo';
import { getDeviceGroupInfoList } from '@/api/dms/deviceGroupInfo';
import { Switch } from 'ant-design-vue';
import { updateDeviceInfo } from '@/api/dms/deviceInfo';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  // {
  //   title: t('dms.deviceInfo.tenantCode'),
  //   dataIndex: 'tenantCode',
  //   width: 100,ifShow:false,
  // },
  {
    title: t('dms.deviceInfo.tenantCode'),
    dataIndex: 'tenantCode',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.name'),
    dataIndex: 'name',
    width: 100,
    // slots: { customRender: 'deviceName' },  // 添加自定义渲染
  },
  {
    title: t('dms.deviceInfo.deviceMac'),
    dataIndex: 'deviceMac',
    width: 100,
    customRender: ({ record }) => {
      return record.deviceMac.toUpperCase();
    },
  },
  {
    title: t('dms.deviceInfo.deviceSn'),
    dataIndex: 'deviceSn',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.isOnline'),
    dataIndex: 'isOnline',
    width: 100,
    customRender: ({ record }) => {
      const status = record.isOnline;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.online') : t('common.disonline');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('dms.deviceInfo.loginName'),
    dataIndex: 'loginName',
    width: 100,
    ifShow:false,
  },
  {
    title: t('dms.deviceInfo.loginPasswd'),
    dataIndex: 'loginPasswd',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.cert'),
    dataIndex: 'cert',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.secret'),
    dataIndex: 'secret',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.type'),
    dataIndex: 'type',
    width: 100,ifShow:false,
  },


  {
    title: t('dms.deviceInfo.lastLogin'),
    dataIndex: 'lastLogin',
    width: 120,
    customRender: ({ record }) => {
      if (record.lastLogin === 0) {
        return '-'
      }
      return formatToDateTime(record.lastLogin);
    },
  },

  {
    title: t('dms.deviceInfo.modemInfo'),
    dataIndex: 'modemInfo',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.modemImei'),
    dataIndex: 'modemImei',
    width: 110,
  },
  {
    title: t('dms.deviceInfo.iccid'),
    dataIndex: 'iccid',
    width: 140,
  },
  {
    title: t('dms.deviceInfo.version'),
    dataIndex: 'version',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.position'),
    dataIndex: 'position',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.address'),
    dataIndex: 'address',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.adcode'),
    dataIndex: 'adcode',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.tags'),
    dataIndex: 'tags',
    width: 100,
  },

  {
    title: t('dms.deviceInfo.isEnable'),
    dataIndex: 'isEnable',
    width: 100, ifShow:false,
  },
  {
    title: t('dms.deviceInfo.expTime'),
    dataIndex: 'expTime',
    width: 100,ifShow:false,
  },
  {
    title: t('dms.deviceInfo.firstLogin'),
    dataIndex: 'firstLogin',
    width: 100,
    customRender: ({ record }) => {
      if (record.lastLogin === 0) {
        return '未激活'
      }
      return formatToDateTime(record.firstLogin);
    },
  },
  {
    title: t('dms.deviceInfo.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.product'),
    dataIndex: 'product',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.group'),
    dataIndex: 'group',
    width: 100,
  },
  {
    title: t('dms.deviceInfo.user'),
    dataIndex: 'user',
    width: 100, 
  },
  {
    title: t('dms.deviceInfo.isEnable'),
    dataIndex: 'isEnable',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.isEnable === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          record.isEnable = newStatus;
          updateDeviceInfo(record)
            .then(() => {
              record.isEnable = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
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
    label: t('dms.deviceInfo.name'),
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'deviceMac',
    label: t('dms.deviceInfo.deviceMac'),
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'deviceSn',
    label: t('dms.deviceInfo.deviceSn'),
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'productCode',
    label: t('dms.deviceInfo.productCode'),
    colProps: { span: 4 },
    component: 'ApiSelect',
    componentProps: {
      api: getProductInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'productName',
      valueField: 'productCode',
    },
  },
  {
    field: 'groupId',
    label: t('dms.deviceInfo.groupId'),
    colProps: { span: 4 },
    component: 'ApiSelect',
    componentProps: {
      api: getDeviceGroupInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'online',
    label: t('dms.deviceInfo.isOnline'),
    component: 'Select',
    colProps: { span: 4 },
    defaultValue: 99,
    componentProps: {
      options: [
        { label: t('common.all'), value: 99 },
        { label: t('common.online'), value: 1 },
        { label: t('common.disonline'), value: 2 },
      ],
    },
  },
  {
    field: 'simIccid',
    label: t('ICCID'),
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'simImei',
    label: t('IMEI'),
    component: 'Input',
    colProps: { span: 4 },
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
    field: 'tenantCode',
    label: t('dms.deviceInfo.tenantCode'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('dms.deviceInfo.name'),
    component: 'Input',
    required: true,
  },

  {
    field: 'deviceMac',
    label: t('dms.deviceInfo.deviceMac'),
    component: 'Input',
    required: true,
  },
  {
    field: 'productCode',
    label: t('dms.deviceInfo.productCode'),
    component: 'ApiSelect',
    componentProps: {
      api: getProductInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'productName',
      valueField: 'productCode',
    },
    rules: [{ required: true, message: '请选择产品ID' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  
  {
    field: 'groupId',
    label: t('dms.deviceInfo.groupId'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getDeviceGroupInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
    rules: [{ required: true, message: '请选择分组' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'isEnable',
    label: t('common.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 0 },
      ],
    },
  },
  {
    field: 'deviceSn',
    label: t('dms.deviceInfo.deviceSn'),
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'loginName',
    label: t('dms.deviceInfo.loginName'),
    component: 'Input',
    show: false,
  },
  {
    field: 'loginPasswd',
    label: t('dms.deviceInfo.loginPasswd'),
    component: 'Input',
    show: false,
  },
  {
    field: 'cert',
    label: t('dms.deviceInfo.cert'),
    component: 'Input',
    show: false,
  },
  {
    field: 'secret',
    label: t('dms.deviceInfo.secret'),
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: t('dms.deviceInfo.type'),
    component: 'InputNumber',
    required: false,
  },
  {
    field: 'description',
    label: t('dms.deviceInfo.description'),
    component: 'Input',
    required: false,
  },

  {
    field: 'userId',
    label: t('dms.deviceInfo.userId'),
    component: 'Input',
    show: false,
  },
  {
    field: 'firstLogin',
    label: t('dms.deviceInfo.firstLogin'),
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'lastLogin',
    label: t('dms.deviceInfo.lastLogin'),
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'version',
    label: t('dms.deviceInfo.version'),
    component: 'Input',
    required: false,
  },
  {
    field: 'position',
    label: t('dms.deviceInfo.position'),
    component: 'Input',
    required: false,
    
  },
  {
    field: 'modemInfo',
    label: t('dms.deviceInfo.modemInfo'),
    component: 'Input',
    required: false,
  },
  {
    field: 'modemImei',
    label: t('dms.deviceInfo.modemImei'),
    component: 'Input',
    required: false,
  },
  {
    field: 'iccid',
    label: t('dms.deviceInfo.iccid'),
    component: 'Input',
    required: false,
  },
  {
    field: 'address',
    label: t('dms.deviceInfo.address'),
    component: 'Input',
    required: false,
  },
  {
    field: 'adcode',
    label: t('dms.deviceInfo.adcode'),
    component: 'Input',
    required: false,
  },
  {
    field: 'tags',
    label: t('dms.deviceInfo.tags'),
    component: 'Input',
    required: false,
  },
  {
    field: 'isOnline',
    label: t('dms.deviceInfo.isOnline'),
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'expTime',
    label: t('dms.deviceInfo.expTime'),
    component: 'InputNumber',
    required: false,
  },
];

export const firmwareColumns: BasicColumn[] = [
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
    width: 100,
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
    width: 80,ifShow:false,
  },
  {
    title: t('pms.productOtaFirmware.push'),
    dataIndex: 'push',
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


export const firmwareSearchFormSchema: FormSchema[] = [
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
    defaultValue: 0,
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
    ifShow:false
  },
];


export const profileColumns: BasicColumn[] = [
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
    title: t('pms.productOtaFirmware.push'),
    dataIndex: 'push',
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


export const profileSearchFormSchema: FormSchema[] = [
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
        { label: 'All', value: "all"},
        { label: 'LAN', value: "lan"},
        { label: 'WIFI', value: "wifi"},
        { label: 'VPN', value: "vpn"},
        // { label: 'Iot', value: "iot"},
        { label: 'Proxy', value: "proxy"},
      ],
    },
    defaultValue: 'all'
  },

];

export const importFormSchema: FormSchema[] = [

  {
    field: 'groupId',
    label: t('dms.deviceInfo.groupId'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getDeviceGroupInfoList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
    rules: [{ required: true, message: '请选择分组' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'file',
    label: t('dms.deviceInfo.selectFile'),
    // component: 'Upload',
    // colProps: { span: 6 },
    slot: 'customSlot',
  },
];

