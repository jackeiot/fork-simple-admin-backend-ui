import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  // {
  //   title: t('pms.productCategory.parentId'),
  //   dataIndex: 'parentId',
  //   width: 100,
  // },
  {
    title: t('pms.productCategory.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.productCategory.description'),
    dataIndex: 'description',
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
    label: t('pms.productCategory.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'description',
  //   label: t('pms.productCategory.description'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  // {
  //   field: 'id',
  //   label: 'ID',
  //   component: 'Input',
  //   show: false,
  // },
  // {
  //   field: 'parentId',
  //   label: t('pms.productCategory.parentId'),
  //   component: 'InputNumber',
  //   required: true,
  // },
  {
    field: 'name',
    label: t('pms.productCategory.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: t('pms.productCategory.description'),
    component: 'InputTextArea',
    required: false,
  },
];
