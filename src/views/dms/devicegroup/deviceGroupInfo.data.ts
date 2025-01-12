import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('dms.deviceGroupInfo.groupId'),
    dataIndex: 'groupId',
    width: 100,
    ifShow: false,
  },

  {
    title: t('dms.deviceGroupInfo.name'),
    dataIndex: 'name',
    width: 100,
  },
  // {
  //   title: t('dms.deviceGroupInfo.code'),
  //   dataIndex: 'code',
  //   width: 100,
  // },
  {
    title: t('dms.deviceGroupInfo.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('dms.deviceGroupInfo.tags'),
    dataIndex: 'tags',
    width: 100,
    ifShow:false
  },
  {
    title: t('dms.deviceGroupInfo.parentId'),
    dataIndex: 'parentId',  ifShow: false,
    width: 100,
  },
  {
    title: t('dms.deviceGroupInfo.parentName'),
    dataIndex: 'parentName',
    width: 100,
  },
  {
    title: t('dms.deviceGroupInfo.userId'),
    dataIndex: 'userId',
    width: 100,
    ifShow: false,
  },
  {
    title: t('dms.deviceGroupInfo.userName'),
    dataIndex: 'userName',
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
    label: t('dms.deviceGroupInfo.name'),
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
    field: 'groupId',
    label: t('dms.deviceGroupInfo.groupId'),
    component: 'Input',
    show: false,
  },
  {
    field: 'parentId',
    label: t('dms.deviceGroupInfo.parentId'),
    component: 'Input',
    show: false,
  },
  {
    field: 'userId',
    label: t('dms.deviceGroupInfo.userId'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('dms.deviceGroupInfo.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: t('dms.deviceGroupInfo.code'),
    component: 'Input',
    show: false,
  },
  {
    field: 'description',
    label: t('dms.deviceGroupInfo.description'),
    component: 'Input',
    required: false,
  },
  {
    field: 'tags',
    label: t('dms.deviceGroupInfo.tags'),
    component: 'Input',
    required: false,
    ifShow:false
  },
];
