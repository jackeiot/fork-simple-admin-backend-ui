import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('dms.deviceTask.taskCode'),
    dataIndex: 'taskCode',
    width: 100,
  },
  {
    title: t('dms.deviceTask.taskType'),
    dataIndex: 'taskType',
    width: 100,
  },
  {
    title: t('dms.deviceTask.userId'),
    dataIndex: 'userId',
    width: 100,
  },
  {
    title: t('dms.deviceTask.userName'),
    dataIndex: 'userName',
    width: 100,
  },
  {
    title: t('dms.deviceTask.deviceId'),
    dataIndex: 'deviceId',
    width: 100,
  },
  {
    title: t('dms.deviceTask.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('dms.deviceTask.taskContent'),
    dataIndex: 'taskContent',
    width: 100,
  },
  {
    title: t('dms.deviceTask.taskResult'),
    dataIndex: 'taskResult',
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
    field: 'taskCode',
    label: t('dms.deviceTask.taskCode'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'taskType',
    label: t('dms.deviceTask.taskType'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'userName',
    label: t('dms.deviceTask.userName'),
    component: 'Input',
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
    field: 'taskCode',
    label: t('dms.deviceTask.taskCode'),
    component: 'Input',
    required: true,
  },
  {
    field: 'taskType',
    label: t('dms.deviceTask.taskType'),
    component: 'Input',
    required: true,
  },
  {
    field: 'userId',
    label: t('dms.deviceTask.userId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'userName',
    label: t('dms.deviceTask.userName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'deviceId',
    label: t('dms.deviceTask.deviceId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: t('dms.deviceTask.description'),
    component: 'Input',
    required: true,
  },
  {
    field: 'taskContent',
    label: t('dms.deviceTask.taskContent'),
    component: 'Input',
    required: true,
  },
  {
    field: 'taskResult',
    label: t('dms.deviceTask.taskResult'),
    component: 'Input',
    required: true,
  },
];
