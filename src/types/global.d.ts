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

        // language microservice interfaces
        interface ILanguage extends IBaseModel {
            code2: string;
            code3: string;
            translations: { [key: string]: { label: string } };
        }

        interface ILabel extends IBaseModel {
            languageCode2: string;
            // data: { [key: string]: any };
            data: typeof labels[0]["data"];
        }

        // auth microservice interfaces
        interface IUser extends IBaseModel {
            email: string;
            password: string;
        }
    }
}
