import { Controller, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { Response } from 'express';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {


    constructor(
        private notificationService: NotificationService
    ){}

    @Sse('sse')
        sendNotification(): Observable<any>{
            return this.notificationService.getNotification();
        
    }
}
