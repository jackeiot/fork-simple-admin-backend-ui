<template>
  <div class="m-4">
    <span style="margin-bottom: 20px; color: blue;" v-if="clientInfo.protocolType==='http'">Tips: HTTP协议的设备为异步获取结果, 推送后需要等待心跳返回</span><br>
    <br/>
    <Textarea placeholder="请输入" :onChange="handOnChange"></Textarea>
    <br/>
    <Button type="primary" :onClick="handleSubmit" > 发送</Button>
  </div>
  <div class="m-4">
    <!-- <Textarea placeholder="结果" :setFieldsValue="debugResult">{{debugResult}}</Textarea> -->
   
    <Card title="结果" :bodyStyle="{minHeight: 20}">
      <template #extra><Button :onclick="clearResult">清空结果</Button></template>
      <List size="small" bordered :data-source="debugResult2">
        <template #renderItem="{ item }">
          <ListItem>
            <ListItemMeta description="">
              <template #title>
                <span>{{ item.title }}</span>
              </template>

            </ListItemMeta>
            {{ item.content }}
          </ListItem>
        </template>
        <!-- <template #header>
          <div>Header</div>
        </template> -->
      </List>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, onUnmounted,watch,ref } from 'vue';
  import dayjs from 'dayjs';
  import { useI18n } from 'vue-i18n';

  import { pushTaskSync } from '@/api/dms/deviceTask';

  const { t } = useI18n();
  import { Button,message, Card, Textarea,List, ListItem, ListItemMeta } from 'ant-design-vue';

  import { DeviceTaskReqEnum, DeviceTaskCodeEnum,DeviceStatuwEnum } from '@/utils/enum/deviceTask';
  import { formatToDateTime } from '@/utils/dateUtil';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);


  const props = defineProps({
    activeKey: {
      type: String,
      required: true
    }
  });

  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")

  const cmd = ref('');
  const debugResult2 = ref<{title:string, content:string}[]>([]);

  async function getResult() {
    try {
      const response = await pushTaskSync({
        requestType: DeviceTaskReqEnum.RequestTypeResult as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
        taskCode: DeviceTaskCodeEnum.cmd,
        taskType: DeviceTaskReqEnum.TaskTypeDEBUG as string,
        clientId: [clientInfo.clientId]
      }); 
      if (response.code === 0 && response.data !== '' && response.data !== null && response.data !== undefined) {
          const time = formatToDateTime(dayjs())
          debugResult2.value.push({title:`[${time}] `+` cmd>>> ${cmd.value}`,content:response.data})
      }
    } catch (error) {
    }
  }

  function handOnChange(val: any) {
    cmd.value = val.target.value
  }

  function clearResult() {
      debugResult2.value = []
    }

  function handleSubmit() {
    if (clientInfo.isOnline === DeviceStatuwEnum.offOnline) {
      message.error('设备不在线');
      return
    }

    if (cmd.value === ''){
      message.error('请输入');
      return
    }

   pushTaskSync({
      requestType: DeviceTaskReqEnum.RequestTypePush as number,
      saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
      syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
      taskCode: DeviceTaskCodeEnum.cmd,
      taskType: DeviceTaskReqEnum.TaskTypeDEBUG as string,
      clientId: [clientInfo.clientId],
      taskContent: cmd.value,
    }).then(result => {
        if (result.code === 0) {
          message.success(t('dms.taskPush.success'))
        }
    }).catch(error => {
          console.log(error)
        })

  }

  // 自动请求结果------------------------------------------------
  let timer: NodeJS.Timeout | null = null;
  function startTimer() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(getResult, DeviceTaskReqEnum.authGetResultTimer); // 默认 5秒
  }
  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  onMounted(async () => {
    if (props.activeKey === 'debug') {
      startTimer(); 
    }
  });

  watch(
    () => props.activeKey,
    async (newVal) => {
      if (newVal !== 'debug') {
        clearTimer(); // 否则，清除定时器
      }
    }
  );


  onUnmounted(() => {
    clearTimer(); // 清除定时器
  });


</script>
