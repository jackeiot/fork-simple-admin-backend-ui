import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.productThingModel.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.productThingModel.identifier'),
    dataIndex: 'identifier',
    width: 100,
  },
  {
    title: t('pms.productThingModel.properties'),
    dataIndex: 'properties',
    width: 100,
    customRender: ({ record }) => {
      if (record.properties.legth > 0 ) {
        record.properties.toString();
      }
      return '-';
    },
  },
  {
    title: t('pms.productThingModel.events'),
    dataIndex: 'events',
    width: 100,
    customRender: ({ record }) => {
      if (record.events.legth > 0 ) {
        record.events.toString();
      }
      return '-';
    },
  },
  {
    title: t('pms.productThingModel.services'),
    dataIndex: 'services',
    width: 100,
    customRender: ({ record }) => {
      if (record.services.legth > 0 ) {
        record.services.toString();
      }
      return '-';
    },
  },
  {
    title: t('pms.productThingModel.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('pms.productThingModel.version'),
    dataIndex: 'version',
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
    field: 'name',
    label: t('pms.productThingModel.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'identifier',
    label: t('pms.productThingModel.identifier'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'name',
    label: t('pms.productThingModel.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'identifier',
    label: t('pms.productThingModel.identifier'),
    component: 'Input',
    required: true,
  },
  {
    field: 'properties',
    label: t('pms.productThingModel.properties'),
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'events',
    label: t('pms.productThingModel.events'),
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'services',
    label: t('pms.productThingModel.services'),
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'description',
    label: t('pms.productThingModel.description'),
    component: 'Input',
    required: false,
  },
  {
    field: 'version',
    label: t('pms.productThingModel.version'),
    component: 'InputNumber',
    required: false,
  },
];
