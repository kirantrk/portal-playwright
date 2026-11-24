import {test , expect} from "@playwright/test"
import {LoginPage} from "../../pages/LoginPage"
import { UploadPage } from "../../pages/UploadPage"
import {FilePage} from "../../pages/FilesPage"
import {env} from '../../config/env'
import { log } from "console"

const PNG_1X1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);


test('Upload file appears in file list' ,{tag:'@smoke'} , async({page})=>{

    const loginPage = new LoginPage(page)
    const uploadPage = new UploadPage(page)
    const filesPage = new FilePage(page)

    const fileName = `smoke-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`

    await loginPage.open()
    await loginPage.login(env.testerEmail , env.testerPassword)

    await uploadPage.open()
    await uploadPage.uploadBuffer({name:fileName,mimeType:'image/png' , buffer:PNG_1X1})
    await expect(uploadPage.successMessage).toContainText(fileName)
    await filesPage.open()
     await expect(filesPage.getFileRow(fileName)).toHaveCount(1);




})