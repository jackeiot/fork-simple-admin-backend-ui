import { FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export const formSchema: FormSchema[] = [
  {
    field: 'enabled',
    label: t('common.on'),
    component: 'Checkbox',
    // colProps: { span: 8 },
  },
  {
    field: 'remote_host',
    label: t('dms.deviceConfig.host'),
    component: 'Input',
    // colProps: { span: 8 },
  },


];
