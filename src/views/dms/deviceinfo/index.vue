<template>
  <div>
    <BasicTable @register="registerTable">

      <template #tableTitle>
        <Button
          type="primary"
          size="small"
          danger
          ghost
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete"
          style="margin-right: 15px;"
        >
          {{ t('common.delete') }}
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          ghost
          preIcon="ant-design:reload-outlined"
          v-if="showDeleteButton"
          @click="BttnBatchReboot"
           style="margin-right: 15px;"
        >
        {{ t('dms.taskPush.taskTypeReboot') }} 
        </Button>
        <Button
          type="primary"
           size="small"
           ghost
          preIcon="ant-design:logout-outlined"
          v-if="showDeleteButton"
          @click="BtnBatchLogout"
           style="margin-right: 15px;"
        >
          {{ t('dms.taskPush.taskTypeRenewReport') }}
        </Button>
        <Button
          type="primary"
          size="small"
          ghost
          preIcon="ant-design:upload-outlined"
          v-if="showDeleteButton"
          @click="BtnBatchUploadLog"
           style="margin-right: 15px;"
        >
        {{ t('dms.taskPush.taskTypeReportLog') }}
        </Button>

        <Button
          type="primary"
          size="small"
          ghost
          preIcon="ant-design:cloud-download-outlined"
          v-if="showDeleteButton"
          @click="BtnBatchUpgrade"
           style="margin-right: 15px;"
        >
        {{ t('dms.taskPush.taskTypeUpgradeFirmware') }}
        </Button>
        <Button
          type="primary"
          size="small"
          ghost
          preIcon="ant-design:profile-outlined"
          v-if="showDeleteButton"
          @click="BtnBatchProfile"
           style="margin-right: 15px;"
        >
        {{ t('dms.taskPush.taskTypProfile') }}
        </Button>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('dms.deviceInfo.addDeviceInfo') }}
        </a-button>
        <a-button type="primary" ghost @click="handleImportCreate">
          {{ t('dms.deviceInfo.importDeviceInfo') }}
        </a-button>
        <a-button type="primary" ghost @click="handleExport">
          {{ t('dms.deviceInfo.exportDeviceInfo') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'bx:log-out-circle',
                color: 'error',
                tooltip: t('sys.user.forceLoggingOut'),
                popConfirm: {
                  title: t('sys.user.forceLoggingOut') + '?',
                  placement: 'left',
                  confirm: BtnLogout.bind(null, record.clientId),
                },
              },
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
        <template v-if="column.key === 'name'">
          <a class="device-link" @click="handleDeviceNameClick(record)">{{ record.name }}</a>
        </template>
      </template>
    </BasicTable>
    <DeviceInfoDrawer @register="registerDrawer" @success="handleSuccess" />
    <DeviceInfoImport @register="importDrawer" @success="handleSuccess" />
    <DeviceInfoUpgrade @register="upgradeDrawer" @success="handleSuccess" />
    <DevicePushProfile @register="profileDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { createVNode, ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Button } from '@/components/Button';
  import { useI18n } from 'vue-i18n';
  import { useDrawer } from '@/components/Drawer';
  import DeviceInfoDrawer from './DeviceInfoDrawer.vue';
  import DeviceInfoImport from './DeviceInfoImport.vue';
  import DeviceInfoUpgrade from './DeviceInfoUpgrade.vue';
  import DevicePushProfile from './DevicePushProfile.vue';
 
  import { columns, searchFormSchema } from './deviceInfo.data';
  import { getDeviceInfoList, deleteDeviceInfo,exportDeviceInfoList } from '@/api/dms/deviceInfo';
  import { useRouter } from 'vue-router';
  import {handleCallbackOnline,handleReboot,handleReportLog} from '@/views/dms/devicetask/action';
  import { saveAs } from 'file-saver';
  import * as XLSX from 'xlsx';
  import { formatInt64ToDateTime } from '@/utils/dateUtil';

  const router = useRouter();
  const { t } = useI18n();

  defineOptions({ name: 'DeviceInfoManagement' });


  const selectedIds = ref<number[] | string[]>();
  const selectedClientIds= ref<string[]>([]);
  const selectedProductCodes= ref<string[]>([]);
  const showDeleteButton = ref<boolean>(false);
  const queseParams = ref<{
  page: number;
  pageSize: number;
  name?:string;
  deviceMac?:string;
  deviceSn?:string;
  productCode?:string;
  simIccid?:string;
  simImei?:string;
  groupId?:number;
  online?:number;
}>();
  const [upgradeDrawer, { openDrawer:openUpgradeDrawer }] = useDrawer();
  const [profileDrawer, { openDrawer:openProfileDrawer }] = useDrawer();
  const [importDrawer, { openDrawer:openImportDrawer }] = useDrawer();
  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: t('dms.deviceInfo.deviceInfoList'),
    api: getDeviceInfoList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    loading: true,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    actionColumn: {
      width: 80,
      title: t('common.action'),
      dataIndex: 'action',
      fixed: undefined,
    },
    rowKey: 'deviceSn',
    rowSelection: {
      type: 'checkbox',
      columnWidth: 20,
      onChange: (selectedRowKeys, _selectedRows) => {
    //  console.log(`selectedRowKeys: ${selectedRowKeys}`, '_selectedRows: ', _selectedRows);
        selectedIds.value = selectedRowKeys as string[];

        let s: string[] = []
        let p: string[] = []
        _selectedRows.forEach((item) => { 
          s.push(item.clientId)
          p.push(item.productCode)
        });
        selectedClientIds.value = s
        selectedProductCodes.value = p
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedClientIds: ', selectedClientIds.value);
        showDeleteButton.value = selectedRowKeys.length > 0;
      },
    },
    beforeFetch: (params) => {

        queseParams.value =params
        return params;
      },
    pagination: {
        pageSizeOptions:['10', '20', '30', '40','50', '100', '200', '500']
    }
  });

  function handleDeviceNameClick(record: Recordable) {
    localStorage.setItem('clientinfo',JSON.stringify(record))
    router.push({ name: 'deviceMessage'})// 配置的菜单访问路径--views下的目录名
  }

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
    const result = await deleteDeviceInfo({ ids: [record.deviceSn] });
    if (result.code === 0) {
      await reload();
    }
  }

  async function handleBatchDelete() {
    Modal.confirm({
      title: t('common.deleteConfirm'),
      icon: createVNode(ExclamationCircleOutlined),
      content: `共 ${selectedIds.value?.length} 条数据`,
      async onOk() {
        const result = await deleteDeviceInfo({ ids: selectedIds.value as string[] });
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

  function areAllElementsSame(arr) {
    if (arr.length === 0) return true;
    const first = arr[0];
    return arr.every(item => item === first);
  }

  function handleImportCreate() {
      openImportDrawer(true, {
        isUpdate: false,
      });
  }

  function handleExport() {
    Modal.confirm({
        title: t('dms.deviceInfo.exportDeviceInfo'),
        content: t('dms.deviceInfo.exportDeviceInfoTips'),
        width: 500,
        async onOk() {exportHandle() },
      });
  }


  function BtnLogout(clientId: string) {
      Modal.confirm({
        title: t('dms.taskPush.confirm'),
        content: t('dms.taskPush.taskTypeRenewReport'),
        width: 500,
        async onOk() {handleCallbackOnline([clientId]) },
      });
  }

  // 批量任务
  function BtnBatchLogout() {
      Modal.confirm({
        title: t('dms.taskPush.confirm'),
        content: t('dms.taskPush.taskTypeRenewReport'),
        width: 500,
        async onOk() {handleCallbackOnline(selectedClientIds.value) },
      });
  }

  function BttnBatchReboot() {
      Modal.confirm({
        title: t('dms.taskPush.confirm'),
        content: t('dms.taskPush.taskTypeReboot'),
        width: 500,
        async onOk() {handleReboot(selectedClientIds.value) },
      });
  }
  function BtnBatchUploadLog() {
    Modal.confirm({
      title: t('dms.taskPush.confirm'),
      content: t('dms.taskPush.taskTypeReportLog'),
      width: 500,
      async onOk() {handleReportLog(selectedClientIds.value)},
    });
  }

  function BtnBatchProfile() {

    if (areAllElementsSame(selectedProductCodes.value) === false) {
      message.error(t('dms.productOtaProfile.productCodeNotSame'));
      return
    }

    openProfileDrawer(true, selectedClientIds.value);
  }

  function BtnBatchUpgrade() {

    if (areAllElementsSame(selectedProductCodes.value) === false) {
      message.error(t('dms.productOtaFirmware.productCodeNotSame'));
      return
    }

    openUpgradeDrawer(true, selectedClientIds.value);
  }


  // 导出
  async function exportHandle() {
    // console.log('beforeUpload ===>' ,queseParams.value)
  
    const req = {
      ...queseParams?.value,
      page: 1,
      pageSize: 10000,
    }
    exportDeviceInfoList(req).then(res => {
      if (res.code === 0 && res.total > 0) {
          console.log('res ===>', res.data)

          const ws = XLSX.utils.json_to_sheet(res.data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          try {
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `设备列表_${res.total}.xlsx`);
          } catch (e) {
            console.error('Export failed: ', e);
          }
        }
      }).catch(error => {
        console.error('下载模板失败:', error);
        // 可以在这里显示一个错误提示给用户
        message.error('下载模板失败');
      });
  }
  
</script>
<style lang="less" scoped>
.device-link {
  color: #0960bd;  // 使用主题蓝色
  cursor: pointer; // 显示手型光标
  
  &:hover {
    color: #0077ff;
    text-decoration: underline;
  }
}
</style>