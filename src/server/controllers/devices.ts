import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DeviceDto } from '../../shared/models/device.dto';
import { DeviceService } from '../lib/device.service';

@Controller('/api/devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('/')
  @ApiResponse({
    type: DeviceDto,
    isArray: true,
  })
  async getDevices() {
    return this.deviceService.getDevices();
  }
}
