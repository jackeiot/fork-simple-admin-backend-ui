import { FormSchema,BasicColumn } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();


export interface ProxyInfo {
  nick_name?: string;
  server_name?: string;
  local_addr?: string;
  local_port?: string;
  protocol?: string;
  remote_port?: string;
  custom_domains?: string;
  http_proxy_prefix?: string;
  http_proxy_port?: string;
  remote?: string;
}


export interface HttpProxyItem {
  nick_name?: string;
  server_name?: string;
  local_addr?: string;
  local_port?: string;
  protocol?: string;
  remote_port?: string;
  custom_domains?: string;
}

export const columns  = [
  {
    title: t('dms.deviceConfig.remote_name'),
    dataIndex: 'nick_name',
    // width: 100,
  },
  {
    title: t('dms.deviceConfig.remote_common'),
    dataIndex: 'server_name',
    // width: 100,
  },
  {
    title: t('dms.deviceConfig.remote_local_addr'),
    dataIndex: 'local_addr',
    width: 100,
    //ifShow:false,
  },
  {
    title: t('dms.deviceConfig.remote_local_port'),
    dataIndex: 'local_port',
    // width: 100,
  },
  {
    title: t('dms.deviceConfig.remote_custom_domain'),
    dataIndex: 'custom_domains',
    key: 'custom_domains',
  },
  {
    title: t('dms.deviceConfig.remote_protocol'),
    dataIndex: 'protocol',
    // width: 100,
  },
  {
    title: t('common.action'),
    key: 'action',
  }
];


export const formSchema: FormSchema[] = [
  {
    field: 'enabled',
    label: t('common.on'),
    component: 'Checkbox',

  },
  {
    field: 'remote',
    label: t('dms.deviceConfig.remote_host'),
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'port',
    label: t('dms.deviceConfig.remote_port'),
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'secret',
    label: t('dms.deviceConfig.remote_token'),
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'tls',
    label: t('dms.deviceConfig.remote_tls'),
    component: 'Checkbox',
    ifShow: false,
  },
];

export const httpProxyFormSchema: FormSchema[] = [
  {
    field: 'nick_name',
    label: t('dms.deviceConfig.remote_name'),
    component: 'Input',
    // required: true,
  },
  {
    field: 'server_name',
    label: t('dms.deviceConfig.remote_common'),
    component: 'Input',
    required: true,
  },
  {
    field: 'protocol',
    label: t('dms.deviceConfig.remote_protocol'),
    component: 'Select',
    defaultValue: 'http',
    required: true,
    componentProps: {
      // disabled: true,
      options: [
        { label: 'http', value: 'http' },
        { label: 'tcp', value: 'tcp' },
        { label: 'udp', value: 'udp' },
      ],
    }
  },
  {
    field: 'local_addr',
    label: t('dms.deviceConfig.remote_local_addr'),
    component: 'Input',
    required: true,
    defaultValue: '127.0.0.1',
  },
  {
    field: 'local_port',
    label: t('dms.deviceConfig.remote_local_port'),
    component: 'Input',
    required: true,
    defaultValue: '80',
  },
  {
    field: 'remote_port',
    label: t('dms.deviceConfig.remote_remote_port'),
    component: 'Input',
    // required: true,
    // ifShow: false,
    ifShow: (formModel) => {
      return false
    },
  },
  {
    field: 'custom_domain',
    label: t('dms.deviceConfig.remote_custom_domain'),
    component: 'Input',
    // required: true,
    ifShow: false,
  },
];
