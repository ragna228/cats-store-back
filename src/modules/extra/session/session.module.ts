import { Module } from '@nestjs/common';
import { SessionManagerService } from './session-manager.service';

@Module({
    imports: [],
    providers: [SessionManagerService],
    exports: [SessionManagerService],
})
export class SessionManagerModule {}