import { AuthService } from "shared/services/auth.service";

export class Upload {
    $key: string;
    file: File;
    url: string;
    name: string;
    message: string;
    progress: number;
    uploadedOn: Date;
    userId: string;
    successfull: boolean;

    constructor (file: File, userId: string) {
        this.file = file;
        this.uploadedOn = new Date();
        this.userId = userId;
    }
}
