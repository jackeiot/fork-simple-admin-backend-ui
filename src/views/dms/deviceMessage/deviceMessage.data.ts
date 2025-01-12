import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.deviceMac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.clientId'),
    dataIndex: 'client_id',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.payload'),
    dataIndex: 'payload',
    width: 100,
  },

];

export const searchFormSchema: FormSchema[] = [
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'device_mac',
    label: t('dms.deviceMessage.deviceMac'),
    component: 'Input',
    required: true,
  },
  {
    field: 'client_id',
    label: t('dms.deviceMessage.clientId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'payload',
    label: t('dms.deviceMessage.payload'),
    component: 'Input',
    required: true,
  },
];

export interface DeviceMessageInfo {
  id: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  deviceSn: string;
  deviceMac: string;
  clientId: string;
  loginName: string;
  loginPasswd: string;
  cert: string;
  secret: string;
  type: number;
  description: string;
  productCode: null | string;
  product: string;
  protocol: string;
  groupId: null | number;
  group: string;
  userId: string;
  user: string;
  tenantCode: string;
  tenantName: string;
  firstLogin: number;
  lastLogin: number;
  version: string;
  position: null | any;
  modemInfo: string;
  modemImei: string;
  iccid: string;
  address: string;
  adcode: string;
  tags: null | any;
  isOnline: number;
  isEnable: number;
  expTime: number;
  sub_topics: any;
  push_topics: any;
}

export interface NeiHaoDeviceHeartBeatData {
  sys: string;
  id:string;
  timestamp:number;
  Data: {
    sys_uptime: number;
    name: string;
    id: string;
    model: string;
    mac: string;
    firmware: string;
    net_type: string;
    imei: string;
    imsi: string;
    iccid: string;
    mncmcc: string;
    lac: string;
    cellid: string;
    csq: string;
    workmode: string;
    wan_bytes_rx: string;
    wan_bytes_tx: string;
    wanip: {
        ipaddr: string;
        netmask: string;
        gateway: string;
        dns1: string;
    };
    lanip: {
        ipaddr: string;
        netmask: string;
    };
    clientlist: any[];
    gnss:{
      gnss_latitude: string;
      gnss_Longitude: string;
      gnss_Altitude: string;
      gnss_Quality: string;
      gnss_Satellites: string;
  };
  }
}
export interface NeiHaoDeviceHeartBeatDataSub {

    sys_uptime: number;
    name: string;
    id: string;
    model: string;
    mac: string;
    firmware: string;
    net_type: string;
    imei: string;
    imsi: string;
    iccid: string;
    mncmcc: string;
    lac: string;
    cellid: string;
    csq: string;
    workmode: string;
    wan_bytes_rx: string;
    wan_bytes_tx: string;
    wanip: {
        ipaddr: string;
        netmask: string;
        gateway: string;
        dns1: string;
    };
    lanip: {
        ipaddr: string;
        netmask: string;
    };
    clientlist: any[];
  
}

export interface GatewayDeviceReportStatusInfo {
  renew_time: number;
  sys_name: string;
  sys_uptime: number;
  device_id: string;
  device_model: string;
  device_mac: string;
  software_version: string;
  work_mode: string;
  local_lan: string;
  network_wan: string;
  network_type: string;
  network_keep_time: number;
  network_down_rate: string;
  network_up_rate: string;
  signal_lac: string;
  signal_cellid: string;
  signal_csq: string;
  signal_rssi: string;
  signal_rsrp: string;
  signal_rsrq: string;
  signal_snr: string;
  modem_model: string;
  modem_imei: string;
  sim_imsi: string;
  sim_iccid: string;
  clients: {
      ip: string;
      mac: string;
      name: string;
      lease_time: number;
  }[];
  gnss: {
      latitude: string;
      longitude: string;
      altitude: string;
      quality: string;
      satellites: string;
      ws: string;
  };
}

export const pushFormSchema: FormSchema[] = [
  {
    field: 'isSaveProfile',
    label: t('dms.taskPush.taskTypIsSaveProfile'),
    component: 'Checkbox',

  },
  {
    field: 'profileName',
    label: t('dms.taskPush.taskTypProfileName'),
    component: 'Input',
    ifShow: ({ values }) => {
      return values.isSaveProfile;
    },

  },
  {
    field: 'profileDesc',
    label: t('dms.taskPush.taskTypProfileDesc'),
    component: 'InputTextArea',
    ifShow: ({ values }) => {
      return values.isSaveProfile;
    },
  },
  ]