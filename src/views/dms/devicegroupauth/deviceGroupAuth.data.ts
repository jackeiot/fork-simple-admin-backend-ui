import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateDeviceGroupAuth } from '@/api/dms/deviceGroupAuth';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('dms.deviceGroupAuth.userId'),
    dataIndex: 'userId',
    width: 100,
  },
  {
    title: t('dms.deviceGroupAuth.groupId'),
    dataIndex: 'groupId',
    width: 100,
  },
  {
    title: t('dms.deviceGroupAuth.groupAuth'),
    dataIndex: 'groupAuth',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateDeviceGroupAuth({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
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
    field: 'groupId',
    label: t('dms.deviceGroupAuth.groupId'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'groupAuth',
    label: t('dms.deviceGroupAuth.groupAuth'),
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
    field: 'userId',
    label: t('dms.deviceGroupAuth.userId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'groupId',
    label: t('dms.deviceGroupAuth.groupId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'groupAuth',
    label: t('dms.deviceGroupAuth.groupAuth'),
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: t('dms.deviceGroupAuth.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 2 },
      ],
    },
  },
];
