import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateFile } from '@/api/pms/file';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.file.userUuid'),
    dataIndex: 'userUUID',
    width: 100,
  },
  {
    title: t('pms.file.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.file.fileType'),
    dataIndex: 'fileType',
    width: 100,
  },
  {
    title: t('pms.file.size'),
    dataIndex: 'size',
    width: 100,
  },
  {
    title: t('pms.file.path'),
    dataIndex: 'path',
    width: 100,
  },
  {
    title: t('pms.file.publicPath'),
    dataIndex: 'publicPath',
    width: 100,
  },
  {
    title: t('pms.file.fileTagIds'),
    dataIndex: 'tagIds',
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
          updateFile({ id: record.id, status: newStatus })
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
    field: 'fileType',
    label: t('pms.file.fileType'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ type: 'number', max: 10 }],
  },
  {
    field: 'fileName',
    label: t('pms.file.fileName'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'period',
    label: t('pms.file.period'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'fileTagIds',
    label: t('pms.file.fileTagIds'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: t('pms.file.status'),
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
    field: 'userUUID',
    label: t('pms.file.userUuid'),
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: t('pms.file.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'fileType',
    label: t('pms.file.fileType'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'size',
    label: t('pms.file.size'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'path',
    label: t('pms.file.path'),
    component: 'Input',
    required: true,
  },
  {
    field: 'publicPath',
    label: t('pms.file.publicPath'),
    component: 'Input',
    required: true,
  },
  {
    field: 'tagIds',
    label: t('pms.file.fileTagIds'),
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: t('pms.file.status'),
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
