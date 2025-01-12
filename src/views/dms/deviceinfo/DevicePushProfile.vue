<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('dms.taskPush.taskTypeUpgradeProfile')"
    width="90%"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" >
        <template #toolbar>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'push'">
            <Button
              type="primary"
              primary          
              @click="handlePush(record)"
            >
              {{ t('pms.productOtaProfile.push') }}
            </Button>
          </template>
        </template>
      </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref ,createVNode} from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { Modal,message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable } from '@/components/Table';
  import { Button} from '@/components/Button';
  import { h } from 'vue';
  import { profileColumns, profileSearchFormSchema } from './deviceInfo.data';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  import { DeviceTaskReqEnum, DeviceTaskCodeEnum } from '@/utils/enum/deviceTask';
  import { getProductOtaProfileList } from '/@/api/pms/productOtaProfile';

  const { t } = useI18n();

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    clientIds.value = data
  });

  const clientIds= ref<string[]>([]);
  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")


  const [registerTable, { reload }] = useTable({
    title: t('pms.productOtaProfile.productOtaProfileList'),
    api: getProductOtaProfileList,
    columns: profileColumns,
    formConfig: {
      labelWidth: 160,
      schemas: profileSearchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn:true,
    showHeader:true,
    ellipsis:true,
    beforeFetch: (params) => {
      params.productCode = clientInfo.productCode;
      params.page = 1;
      params.pageSize = 9999;
      return params;
    },
    rowKey: 'id',
  });



  async function handlePush(record: Recordable) {
    if (record.content === '' || record.content.length < 5 || record.content === null || record.content === undefined) {
      message.error('此配置内容异常!');
      return;
    }

    let tips = ''
    if (clientInfo.protocolType === "http") {
      tips = '当前设备的协议类型为http, 非实时推送，推送后需要等待设备的心跳拉取. '
    } else {}
    tips = tips + '确认向设备推送 此飞行配置表？' + '\n' + record.name;

    Modal.confirm({
      title: t('dms.taskPush.confirm'),
      content: tips,
      icon: createVNode(ExclamationCircleOutlined),
      width: 800,
      async onOk() {
        const result = await pushTaskSync({
        requestType: DeviceTaskReqEnum.RequestTypeProfile as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
        taskCode: DeviceTaskCodeEnum.proxyCfg,
        taskType: DeviceTaskReqEnum.TaskTypeCONFIG as string,
        clientId: clientIds.value,
        taskContent: record.content
      });

      if (result.code === 0) {
        closeDrawer();
        message.success('推送任务成功');
      }
        setDrawerProps({ confirmLoading: false });
      },
      onCancel() {
        setDrawerProps({ confirmLoading: false });
      },
    });
  }

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    closeDrawer();
  }
</script>
