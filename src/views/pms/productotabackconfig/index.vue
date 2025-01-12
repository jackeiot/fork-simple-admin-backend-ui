<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button
          type="primary"
          danger
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete"
        >
          {{ t('common.delete') }}
        </Button>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('pms.productOtaBackconfig.addProductOtaBackconfig') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'upload'">
          <BasicUpload 
          :api="uploadFile" 
          :upload-params="beforeUpload(record)"  
          :calculateMd5="true" 
          :max-size="32"
           @change="UploadOnChange"
          />
        </template>
      </template>
    </BasicTable>
    <ProductOtaBackconfigDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { createVNode, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Button } from '@/components/Button';

  import { useDrawer } from '@/components/Drawer';
  import ProductOtaBackconfigDrawer from './ProductOtaBackconfigDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './productOtaBackconfig.data';
  import { getProductOtaBackconfigList, deleteProductOtaBackconfig } from '@/api/pms/productOtaBackconfig';
  import { uploadFile } from '@/api/pms/file';
  import { BasicUpload,  } from '@/components/Upload';

  defineOptions({ name: 'ProductOtaBackconfigManagement' });

  const { t } = useI18n();
  const selectedIds = ref<number[] | string[]>();
  const showDeleteButton = ref<boolean>(false);

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: t('pms.productOtaBackconfig.productOtaBackconfigList'),
    api: getProductOtaBackconfigList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    actionColumn: {
      width: 50,
      title: t('common.action'),
      dataIndex: 'action',
      fixed: undefined,
    },
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
      columnWidth: 20,
      onChange: (selectedRowKeys, _selectedRows) => {
        selectedIds.value = selectedRowKeys as number[];
        showDeleteButton.value = selectedRowKeys.length > 0;
      },
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    const result = await deleteProductOtaBackconfig({ ids: [record.id] });
    if (result.code === 0) {
      await reload();
    }
  }

  async function handleBatchDelete() {
    Modal.confirm({
      title: t('common.deleteConfirm'),
      icon: createVNode(ExclamationCircleOutlined),
      async onOk() {
        const result = await deleteProductOtaBackconfig({ ids: selectedIds.value as number[] });
        if (result.code === 0) {
          showDeleteButton.value = false;
          await reload();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  async function handleSuccess() {
    await reload();
  }

    // 处理文件变化
    function beforeUpload(record) {
    console.log(record)
    return {id: record.id, fileType: "config"}

  }

  function UploadOnChange() {
    reload();

  }
</script>
