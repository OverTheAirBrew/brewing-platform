import { Inject, Injectable } from '@nestjs/common';
import { DEVICE_REPOSITORY } from '../data/database.abstractions';
import { Device } from '../data/entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DEVICE_REPOSITORY) private deviceRepository: typeof Device,
  ) {}

  async getDevices() {
    const devices = await this.deviceRepository.findAll();
    return devices.map((device) => device.toJSON());
  }
}
