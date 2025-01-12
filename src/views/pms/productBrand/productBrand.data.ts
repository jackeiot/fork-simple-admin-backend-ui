import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.productBrand.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('pms.productBrand.logoUrl'),
    dataIndex: 'logoUrl',
    width: 100,
  },
  {
    title: t('pms.productBrand.website'),
    dataIndex: 'website',
    width: 100,
  },
  {
    title: t('pms.productBrand.description'),
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
    label: t('pms.productBrand.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'logoUrl',
  //   label: t('pms.productBrand.logoUrl'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  // {
  //   field: 'website',
  //   label: t('pms.productBrand.website'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
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
    label: t('pms.productBrand.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'logoUrl',
    label: t('pms.productBrand.logoUrl'),
    component: 'Input',
    required: false,
  },
  {
    field: 'website',
    label: t('pms.productBrand.website'),
    component: 'Input',
    required: false,
  },
  {
    field: 'description',
    label: t('pms.productBrand.description'),
    component: 'InputTextArea',
    required: false,
  },
];
