import { FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();



export const formSchema: FormSchema[] = [

  {
    field: 'lan_ipaddr',
    label: t('dms.deviceConfig.lanIp'),
    component: 'Input',
    // colProps: { span: 8 },
    // defaultValue: '192.168.10.1',
  },
  {
    field: 'lan_mask',
    label: t('dms.deviceConfig.LanMask'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'lan_gateway',
    label: t('dms.deviceConfig.lanGateway'),
    component: 'Input',
    show:false
    // colProps: { span: 8 },
  },
  {
    field: 'lan_dns',
    label: t('dms.deviceConfig.lanDns'),
    component: 'Input',
    ifShow:false
    // colProps: { span: 8 },
  },
  {
    field: 'dhcp_enabled',
    label: t('dms.deviceConfig.dhcpEnable'),
    component: 'Checkbox',
    // defaultValue: true,
  },
  {
    field: 'dhcp_start',
    label: t('dms.deviceConfig.dhcpStart'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'dhcp_end',
    label: t('dms.deviceConfig.dhcpEnd'),
    component: 'Input',
    // colProps: { span: 8 },
  },
];
