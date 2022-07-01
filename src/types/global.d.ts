/* eslint-disable no-unused-vars */

export declare global {
    namespace I {
        // ---------------------------------
        interface IBaseModel {
            id: string;
            _dateCreated?: number;
            _dateUpdated?: number;
            _dateDeleted?: number | string;
        }

        // auth microservice interfaces
        interface IUser extends IBaseModel {
            email: string;
            password: string;
        }
    }
}
