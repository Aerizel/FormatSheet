import { NEW_USERINFO_COLUMN, OLD_USERINFO_SHEET_COLUMN_AMOUNT, START_USERINFO_CODE } from "../../config/format_sheet_config";
import { orgModel } from "../../models/formatExcel/organize_structure_model";
import { newUserInfoModel, oldUserInfoModel } from "../../models/formatExcel/user_info";

export function UserInfoToModel(sheetData: any): oldUserInfoModel[] {
    const orgStr = JSON.stringify(sheetData);
    const userObj: Record<string, any>[] = JSON.parse(orgStr);
    let userInfo: oldUserInfoModel[] = [];

    for (var data of userObj) {
        let countCheck = 0;
        const userInfoArr = Object.entries(data).map(([key, value]) => {
            countCheck++;
            return value;
        });

        if (countCheck === OLD_USERINFO_SHEET_COLUMN_AMOUNT) {
            const userData: oldUserInfoModel = {
                thaiPrefix: userInfoArr[0],
                thaiName: userInfoArr[1],
                thaiSurname: userInfoArr[2],
                engPrefix: userInfoArr[3],
                engName: userInfoArr[4],
                engSurname: userInfoArr[5],
                nickname: userInfoArr[6],
                officePhone: userInfoArr[7],
                email: userInfoArr[8],
                role: userInfoArr[9],
                officeName: userInfoArr[10],
                username: userInfoArr[11],
                empInfo: userInfoArr[12],
            }

            userInfo.push(userData);
        }
    }

    return userInfo;
}

export function FormatUserInfo(affName: string, sheetData: oldUserInfoModel[], orgData: orgModel[]): [newUserInfoModel[], (string | number)[][]] {
    if (sheetData.length, orgData.length) {
        let chrcodemp2 = START_USERINFO_CODE - 1;

        const userInfoColumn: string[] = [
            NEW_USERINFO_COLUMN.thaiPrefix,
            NEW_USERINFO_COLUMN.thaiName,
            NEW_USERINFO_COLUMN.thaiSurname,
            NEW_USERINFO_COLUMN.engPrefix,
            NEW_USERINFO_COLUMN.engName,
            NEW_USERINFO_COLUMN.engSurname,
            NEW_USERINFO_COLUMN.nickname,
            NEW_USERINFO_COLUMN.officePhone,
            NEW_USERINFO_COLUMN.email,
            NEW_USERINFO_COLUMN.role,
            NEW_USERINFO_COLUMN.affiliation1,
            NEW_USERINFO_COLUMN.affiliation2,
            NEW_USERINFO_COLUMN.affiliation3,
            NEW_USERINFO_COLUMN.chrcodemp1,
            NEW_USERINFO_COLUMN.username,
            NEW_USERINFO_COLUMN.empInfo,
            NEW_USERINFO_COLUMN.chrcodeemp2
        ];

        const userArr: (string | number)[][] = [];
        const userData: newUserInfoModel[] = [];

        sheetData.map((data) => {
            ++chrcodemp2;

            let chrcodemp1: number | string = '';

            let index = 0;
            while (orgData.length > index) {
                if (data.officeName === orgData[index].doc) {
                    chrcodemp1 = orgData[index].chcodemp ?? '';
                    index = orgData.length + 1;
                } else {
                    ++index;
                }
            }

            /*orgData.forEach((items) => {
                if (data.officeName === items.doc) {
                    chrcodemp1 = items.chcodemp ?? '';
                }
            });*/

            userData.push({
                thaiPrefix: data.thaiPrefix,
                thaiName: data.thaiName,
                thaiSurname: data.thaiSurname,
                engPrefix: data.engPrefix,
                engName: data.engName,
                engSurname: data.engSurname,
                nickname: data.nickname,
                officePhone: data.officePhone,
                email: data.email,
                role: data.role,
                affiliation1: affName,
                affiliation2: data.officeName,
                affiliation3: data.officeName,
                chrcodemp1: chrcodemp1,
                username: data.username,
                empInfo: data.empInfo,
                chrcodemp2: chrcodemp2
            });

            userArr.push([
                data.thaiPrefix,
                data.thaiName,
                data.thaiSurname,
                data.engPrefix,
                data.engName,
                data.engSurname,
                data.nickname,
                data.officePhone,
                data.email,
                data.role,
                affName,
                data.officeName,
                data.officeName,
                chrcodemp1,
                data.username,
                data.empInfo,
                chrcodemp2
            ]);

        });

        userArr.splice(0, 0, userInfoColumn);

        return [
            userData,
            userArr
        ];
    } else {
        return [[], []];
    }
}
