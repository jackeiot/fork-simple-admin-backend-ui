import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
const { t } = useI18n();
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'date_time',
    label: t('dms.deviceMessage.datetime'),
    component: 'RangePicker', // 使用 RangePicker 作为日期时间选择器
    componentProps: {
      showTime: true, // 显示时间选择器
      format: 'YYYY-MM-DD HH:mm:ss', // 日期时间格式
    },
    colProps: { span: 4},
  },
];



export const onlineColumns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.device_name'),
    dataIndex: 'device_name',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.device_mac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.status'),
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('dms.deviceMessage.connected') : t('dms.deviceMessage.disconnected');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('dms.deviceMessage.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.timestamp'),
    dataIndex: 'timestamp',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.timestamp);
    },
  },
];

export const eventColumns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.device_name'),
    dataIndex: 'device_name',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.device_mac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.event_type'),
    dataIndex: 'event_type',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.event_level'),
    dataIndex: 'event_level',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.event_content'),
    dataIndex: 'event_content',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.timestamp'),
    dataIndex: 'timestamp',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.timestamp);
    },
  },
];

export const flowColumns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.device_name'),
    dataIndex: 'device_name',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.device_mac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.flow_upload'),
    dataIndex: 'flow_upload',
    width: 100,
    customRender: ({ record }) => {
      return (parseFloat(record?.flow_upload || '0') / 1048576).toFixed(2) 
    },
  },
  {
    title: t('dms.deviceMessage.flow_download'),
    dataIndex: 'flow_download',
    width: 100,
    customRender: ({ record }) => {
      return (parseFloat(record?.flow_download || '0') / 1048576).toFixed(2) 
    },
  },
  {
    title: t('dms.deviceMessage.flow_total'),
    dataIndex: 'flow_total',
    width: 100,
    customRender: ({ record }) => {
      return (parseFloat(record?.flow_total || '0') / 1048576).toFixed(2) 
    },
  },
  {
    title: t('dms.deviceMessage.flow_upload_rate'),
    dataIndex: 'flow_upload_rate',
    width: 100,
  },

  {
    title: t('dms.deviceMessage.flow_download_rate'),
    dataIndex: 'flow_download_rate',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.timestamp'),
    dataIndex: 'timestamp',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.timestamp);
    },
  },
];


export const netwrokColumns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.device_name'),
    dataIndex: 'device_name',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.device_mac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.network_type'),
    dataIndex: 'network_type',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.network_csq'),
    dataIndex: 'network_csq',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.network_rsrp'),
    dataIndex: 'network_rsrp',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.network_rsrq'),
    dataIndex: 'network_rsrq',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.network_rssi'),
    dataIndex: 'network_rssi',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.network_snr'),
    dataIndex: 'network_snr',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.timestamp'),
    dataIndex: 'timestamp',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.timestamp);
    },
  },
];

export const taskColumns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.device_name'),
    dataIndex: 'device_name',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.device_mac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.task_name'),
    dataIndex: 'task_name',
    width: 100,
    ifShow: false,
  },
  {
    title: t('dms.deviceMessage.task_type'),
    dataIndex: 'task_type',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.task_data'),
    dataIndex: 'task_data',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.task_status'),
    dataIndex: 'task_status',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.task_result'),
    dataIndex: 'task_result',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.account'),
    dataIndex: 'account',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.timestamp'),
    dataIndex: 'timestamp',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.timestamp);
    },
  },
];

export const logsColumns: BasicColumn[] = [
  {
    title: t('dms.deviceMessage.device_name'),
    dataIndex: 'device_name',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.device_mac'),
    dataIndex: 'device_mac',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.log_level'),
    dataIndex: 'log_level',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.log_file'),
    dataIndex: 'log_file',
    width: 100,
  },
  {
    title: t('dms.deviceMessage.timestamp'),
    dataIndex: 'timestamp',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.timestamp);
    },
  },
];
