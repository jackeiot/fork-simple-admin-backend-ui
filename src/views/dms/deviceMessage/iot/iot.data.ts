import { BasicColumn,FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
const { t } = useI18n();



export const formSchema: FormSchema[] = [
  {
    field: 'enabled',
    label: t('common.on'),
    component: 'Checkbox',
    // colProps: { span: 8 },
  },
  {
    field: 'type',
    label: t('dms.deviceConfig.SerialName'),
    component: 'Select',
    // defaultValue: 1,
    componentProps: {
      options: [
        { label: t('COM1'), value: "0" },
        { label: t('COM2'), value: "1" },
        // { label: t('CHAP'), value: "2" },
        // { label: t('MS-CHAPv2'), value: "3" },
      ],
    },
  },
  {
    field: 'SerialPort',
    label: t('dms.deviceConfig.SerialPort'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'SerialBaud',
    label: t('dms.deviceConfig.SerialBaud'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'SerialData',
    label: t('dms.deviceConfig.SerialData'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'SerialStop',
    label: t('dms.deviceConfig.SerialStop'),
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
  },
  {
    field: 'SerialParity',
    label: t('dms.deviceConfig.SerialParity'),
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
    // colProps: { span: 8 },
  },
  {
    field: 'remote_lan',
    label: t('dms.deviceConfig.remoteLan'),
    component: 'Input',
    // colProps: { span: 8 },
  },
  {
    field: 'remote_mask',
    label: t('dms.deviceConfig.remoteMask'),
    component: 'Input',
    // colProps: { span: 8 },
  },

];
