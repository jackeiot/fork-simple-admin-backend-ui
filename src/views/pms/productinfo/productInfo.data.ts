import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateProductInfo } from '@/api/pms/productInfo';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { getProductBrandList } from '@/api/pms/productBrand';
import { getProductCategoryList } from '@/api/pms/productCategory';
import { getProductThingModelList } from '@/api/pms/productThingModel';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('pms.productInfo.productName'),
    dataIndex: 'productName',
    width: 100,
  },
  {
    title: t('pms.productInfo.productCode'),
    dataIndex: 'productCode',
    width: 100,
  },
  {
    title: t('pms.productInfo.things'),
    dataIndex: 'things',
    width: 100,
  },
  {
    title: t('pms.productInfo.productType'),
    dataIndex: 'productType',
    width: 100, ifShow:false,
  },
  {
    title: t('pms.productInfo.productImg'),
    dataIndex: 'productImg',
    width: 100,
  },
  {
    title: t('pms.productInfo.authMethod'),
    dataIndex: 'authMethod',
    width: 100, ifShow:false,
  },
  {
    title: t('pms.productInfo.deviceType'),
    dataIndex: 'deviceType',
    width: 100, ifShow:false,
  },
  {
    title: t('pms.productInfo.netType'),
    dataIndex: 'netType',
    width: 100, ifShow:false,
  },
  {
    title: t('pms.productInfo.autoRegister'),
    dataIndex: 'autoRegister',
    width: 100, ifShow:false,
  },
  {
    title: t('pms.productInfo.secret'),
    dataIndex: 'secret',
    width: 100, ifShow:false,
  },

  {
    title: t('pms.productInfo.category'),
    dataIndex: 'category',
    width: 100,
  },
  {
    title: t('pms.productInfo.brand'),
    dataIndex: 'brand',
    width: 100,
  },
  {
    title: t('pms.productInfo.tags'),
    dataIndex: 'tags',
    width: 100,
  },
  {
    title: t('pms.productInfo.description'),
    dataIndex: 'description',
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
          updateProductInfo({ id: record.id, status: newStatus })
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
    field: 'productName',
    label: t('pms.productInfo.productName'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'productCode',
    label: t('pms.productInfo.productCode'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'categoryId',
    label: t('pms.productInfo.category'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'brandId',
    label: t('pms.productInfo.brand'),
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
    field: 'productName',
    label: t('pms.productInfo.productName'),
    component: 'Input',
    required: true,
  },

  {
    field: 'categoryId',
    label: t('pms.productInfo.category'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getProductCategoryList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
    rules: [{ required: true, message: '请选择产品类型' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'brandId',
    label: t('pms.productInfo.brand'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getProductBrandList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
    rules: [{ required: true, message: '请选择制造商' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'thingsId',
    label: t('pms.productInfo.things'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getProductThingModelList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
    rules: [{ required: true, message: '请选择产品模型' }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'productImg',
    label: t('pms.productInfo.productImg'),
    component: 'Input',
    required: false,
  },
  {
    field: 'productType',
    label: t('pms.productInfo.productType'),
    component: 'InputNumber',
    required: false, show: false,
  },
  {
    field: 'authMethod',
    label: t('pms.productInfo.authMethod'),
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'deviceType',
    label: t('pms.productInfo.deviceType'),
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'netType',
    label: t('pms.productInfo.netType'),
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'autoRegister',
    label: t('pms.productInfo.autoRegister'),
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'secret',
    label: t('pms.productInfo.secret'),
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'category',
    label: t('pms.productInfo.category'),
    component: 'InputNumber',
    required: false, show: false,
  },
  {
    field: 'description',
    label: t('pms.productInfo.description'),
    component: 'Input',
    required: false,
  },
  {
    field: 'tags',
    label: t('pms.productInfo.tags'),
    component: 'Input',
    required: false,
  },
  {
    field: 'status',
    label: t('pms.productInfo.status'),
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
