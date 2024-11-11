import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class NotificationService {
    
        private notifications$ = new Subject();


        sendNotification(notification: any){
            return this.notifications$.next(notification)
        }

        getNotification(): Observable<any>{
            return this.notifications$.asObservable();
        }
}
