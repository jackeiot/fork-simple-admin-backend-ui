<template>
  <div>
    <BasicTable @register="registerTable" >
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleCreate">
          {{ t('pms.productOtaFirmware.addProductOtaFirmware') }}
        </a-button> -->
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'push'">
          <Button
          type="primary"
          primary          
          @click="handlePush(record)"
        >
          {{ t('pms.productOtaFirmware.push') }}
        </Button>

        </template>

      </template>
    </BasicTable>
    <ProductOtaFirmwareDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { createVNode, ref } from 'vue';
  import { Modal,message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable } from '@/components/Table';
  import { Button } from '@/components/Button';
  import { useDrawer } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './backup.data';
  import { getProductOtaBackconfigList } from '@/api/pms/productOtaBackconfig';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  import { DeviceTaskReqEnum, DeviceTaskCodeEnum } from '@/utils/enum/deviceTask';

  // defineOptions({ name: 'ProductOtaBackconfigManagement' });

  const { t } = useI18n();

  const showDeleteButton = ref<boolean>(false);
  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: t('pms.productOtaBackconfig.productOtaBackconfigList'),
    api: getProductOtaBackconfigList,
    columns,
    formConfig: {
      labelWidth: 160,
      schemas: searchFormSchema,
    },
    showIndexColumn:true,
    useSearchForm: true,
    autoCreateKey: false,
    showTableSetting: false,
    bordered: true,
    showHeader:true,
    ellipsis:true,
    // actionColumn: {
    //   width: 50,  // 设置 action 列的宽度
    //   title: t('common.action'),
    //   dataIndex: 'action',
    //   fixed: 'right', // 固定 action 列在右侧
    // },
    rowKey: 'id',
    // rowSelection: {
    //   type: 'checkbox',
    //   columnWidth: 20,
    //   onChange: (selectedRowKeys, _selectedRows) => {
    //     selectedIds.value = selectedRowKeys as number[];
    //     showDeleteButton.value = selectedRowKeys.length > 0;
    //   },
    // },
  });

  async function handlePush(record: Recordable) {

    if (record.fileUrl === '' || record.fileUrl === null || record.fileUrl === undefined) {
      message.error('此备份文件链接不存在!');
      return;
    }

    let tips = ''
    if (clientInfo.protocolType === "http") {
      tips = '当前设备的协议类型为http, 非实时推送，推送后需要等待设备的心跳拉取. '
    } else {}
    tips = tips + '确认向设备推送 此备份文件？' + '\n' + record.fileName;

    Modal.confirm({
      title: t('dms.taskPush.confirm'),
      content: tips,
      icon: createVNode(ExclamationCircleOutlined),
      width: 800,
      async onOk() {
        const context = {file_name: record.fileName, url: record.fileUrl, version:record.version, md5:record.fileMd5, reset: "0"}
        const result = await pushTaskSync({
          requestType: DeviceTaskReqEnum.RequestTypeGet as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOn as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
        taskCode: DeviceTaskCodeEnum.upgradeBackup,
        taskType: DeviceTaskReqEnum.TaskTypeOTA as string,
        clientId: [clientInfo.clientId],
        taskContent: JSON.stringify(context) 
      });

        if (result.code === 0) {
          showDeleteButton.value = false;
          message.success('推送任务成功');
          // await reload();
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
 

</script>
