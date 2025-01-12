
import { pushTaskSync } from '@/api/dms/deviceTask';
import { DeviceTaskReqEnum, DeviceTaskCodeEnum } from '@/utils/enum/deviceTask';
import { message } from 'ant-design-vue';


export async function handleCallbackOnline(clientId: string[]) {
    const result = await pushTaskSync({
      requestType: DeviceTaskReqEnum.RequestTypePush as number,
      saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
      syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
      taskCode: DeviceTaskCodeEnum.callbackOnline,
      taskType: DeviceTaskReqEnum.TaskTypeACTION as string,
      clientId: clientId,
      // taskContent: 'reboot',
    }); 
    if (result.code === 0) {
      message.success('success');
    } else {
      message.error('failed');
    } 
    return result;
}

export async function handleReboot(clientId: string[]) {
    const result = await pushTaskSync({
      requestType: DeviceTaskReqEnum.RequestTypePush as number,
      saveProfile: DeviceTaskReqEnum.SaveProfileTypeOn as number,
      syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
      taskCode: DeviceTaskCodeEnum.reboot,
      taskType: DeviceTaskReqEnum.TaskTypeACTION as string,
      clientId: clientId,
      // taskContent: 'reboot',
    }); 
    if (result.code === 0) {
      message.success('success');
    } else {
      message.error('failed');
    } 
    return result;
}

export async function handleReportLog(clientId: string[]) {
    const result = await pushTaskSync({
      requestType: DeviceTaskReqEnum.RequestTypePush as number,
      saveProfile: DeviceTaskReqEnum.SaveProfileTypeOn as number,
      syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
      taskCode: DeviceTaskCodeEnum.syslog,
      taskType: DeviceTaskReqEnum.TaskTypeACTION as string,
      clientId: clientId,
      // taskContent: 'reportlog',
    }); 
    if (result.code === 0) {
      message.success('success');
    } else {
      message.error('failed');
    } 
    return result;
}
