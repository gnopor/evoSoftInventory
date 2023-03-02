/* eslint-disable no-unused-vars */
import labels from "../../public/json/labels.json";

export declare global {
    namespace I {
        // ---------------------------------
        interface IBaseModel {
            id: string;
            _dateCreated?: number;
            _dateUpdated?: number;
            _dateDeleted?: number | string;
        }

        interface ILanguage {
            code2: string;
            code3: string;
            translations: { [key: string]: { label: string } };
        }

        interface ILabel {
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
