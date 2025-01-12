import { FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();


export const formSchema: FormSchema[] = [
  {
    field: 'enabled',
    label: t('dms.deviceConfig.WifiEnable'),
    component: 'Checkbox',
    defaultValue: true,
  },
  {
    field: 'ssid',
    label: t('dms.deviceConfig.WifiSSID'),
    component: 'Input',
  },
  {
    field: 'password',
    label: t('dms.deviceConfig.WifiPassword'),
    component: 'Input',
  },
  {
    field: 'auth_type',
    label: t('dms.deviceConfig.WifiAuthType'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('WPA'), value: "1" },
        { label: t('WPA2'), value: "2" },
        { label: t('WPA/WPA2'), value: "3" },
        { label: t('None'), value: "0" },
        // { label: t('MS-CHAPv2'), value: "3" },
      ],
    },
    defaultValue: '2',
  },
  {
    field: 'channel',
    label: t('dms.deviceConfig.WifiChannel'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('Auto'), value: "0" },
        { label: t('1'), value: "1" },
        { label: t('2'), value: "2" },
        { label: t('3'), value: "3" },
        { label: t('4'), value: "4" },
        { label: t('5'), value: "5" },
        { label: t('6'), value: "6" },
        { label: t('7'), value: "7" },
        { label: t('8'), value: "8" },
        { label: t('9'), value: "9" },
        { label: t('10'), value: "10" },
        { label: t('11'), value: "11" },
        { label: t('12'), value: "12" },
        { label: t('13'), value: "13" },
      ],
    },
    defaultValue: '6',
  },
];

export const w58FormSchema: FormSchema[] = [
  {
    field: 'enabled',
    label: t('dms.deviceConfig.WifiEnable'),
    component: 'Checkbox',
    defaultValue: true,
  },
  {
    field: 'ssid',
    label: t('dms.deviceConfig.WifiSSID'),
    component: 'Input',
  },
  {
    field: 'password',
    label: t('dms.deviceConfig.WifiPassword'),
    component: 'Input',
  },
  {
    field: 'auth_type',
    label: t('dms.deviceConfig.WifiAuthType'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('WPA'), value: "1" },
        { label: t('WPA2'), value: "2" },
        { label: t('WPA/WPA2'), value: "3" },
        { label: t('None'), value: "0" },
      ],
    },
    defaultValue: '2',
  },
  {
    field: 'channel',
    label: t('dms.deviceConfig.WifiChannel'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('Auto'), value: "0" },
        { label: t('149'), value: "149" },
        { label: t('153'), value: "153" },
        { label: t('157'), value: "157" },
        { label: t('161'), value: "161" },
        { label: t('165'), value: "165" },
      ],
    },
    defaultValue: '153',
  },
];
