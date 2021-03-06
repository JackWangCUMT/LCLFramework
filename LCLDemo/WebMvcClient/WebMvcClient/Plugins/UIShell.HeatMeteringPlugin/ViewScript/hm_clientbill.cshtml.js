﻿/// <reference path="/Content/Code/LCL.JQuery.Base.js" /> 
/// <reference path="/Content/Core/LCL.JQuery.Core.js" /> 
/// <reference path="/Content/Core/LCL.JQuery.JSON.js" /> 
/// <reference path="/Content/Core/LCL.JQuery.Plugins.js" /> 
/*******************************************************  
*   
* 作者：罗敏贵  
* 说明： 客户票据 
* 运行环境：.NET 4.5.0  
* 版本号：1.0.0  
*   
* 历史记录：  
*    创建文件 罗敏贵 2016年1月15日 
*   
*******************************************************/  
//页面属性PageAttr （该行不允许删除） 
var pageAttr = { 
    SiteRoot: '', 
    LanguageId: '2052', 
    JsonServerURL: '', 
    Added: true, 
    toolbar: '' 
}; 
//页面入口 
$(document).ready(function () { 
    //debugger; 
    InitAttribute(); 
    InitLanguage(); 
    InitControls(); 
    InitEvent(); 
}); 
//初始化页面属性 
function InitAttribute() { 
    pageAttr.SiteRoot = $.LCLBase.SiteConfig.GetSiteRoot(); 
    pageAttr.LanguageId = $.LCLBase.SiteConfig.GetCurrLanguageID(); 
    pageAttr.JsonServerURL = pageAttr.SiteRoot + 'UIShell.HeatMeteringPlugin/'; 
} 
//初始化多语言 
function InitLanguage() { 
    $.LCLPageModel.Resource.InitLanguage(); 
} 
//初始化控件 
function InitControls() { 
    InitGrid(); 
} 
//初始化事件 
function InitEvent() { 
    $('#btnAddhm_clientbill').click(function () { pageFunc_hm_clientbillAdd(); }); 
    $('#btnDelhm_clientbill').click(function () { pageFunc_hm_clientbillDel(); }); 
    $('#btnSearchhm_clientbill').click(function () { pageFunc_SearchDatahm_clientbill(); }); 
} 
function InitGrid() { 
    $('#grid_hm_clientbill').datagrid({ 
        url: pageAttr.JsonServerURL + 'HM_ClientBill/AjaxGetByPage', 
        iconCls: 'icon-edit', 
        pagination: true, 
        rownumbers: true, 
        fitCloumns: true, 
        idField: "ID", 
        frozenColumns: [[ 
          { field: 'ck', checkbox: true } 
        ]], 
        hideColumn: [[ 
           { title: 'ID', field: 'ID' } 
        ]], 
        columns: [[ 
                { field: 'ID', title: $.LCLPageModel.Resource.PageLanguageResource.HM_ClientBill_Model_ID, width: 100,hidden:true }, 
                { field: 'BillNumber', title: $.LCLPageModel.Resource.PageLanguageResource.HM_ClientBill_Model_BillNumber, width: 100 }, 
                { field: 'IsDelete', title: $.LCLPageModel.Resource.PageLanguageResource.HM_ClientBill_Model_IsDelete, width: 100,hidden:true }, 
                { field: 'AddDate', title: $.LCLPageModel.Resource.PageLanguageResource.HM_ClientBill_Model_AddDate, width: 100,hidden:true }, 
                { field: 'UpdateDate', title: $.LCLPageModel.Resource.PageLanguageResource.HM_ClientBill_Model_UpdateDate, width: 100,hidden:true }, 
                { field: 'ClientHeatCharge_ID', title: $.LCLPageModel.Resource.PageLanguageResource.HM_ClientBill_Model_ClientHeatCharge_ID, width: 100 }, 
                { 
                    field: 'opt', title: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Grid_Operate, width: 120, align: 'center', 
                    formatter: function (value, rec, index) { 
                        return '&nbsp;<a href="javascript:void(0)" onclick="pageFunc_hm_clientbillEdit(\'' + rec.ID + '\')">' + $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Edit + '</a>&nbsp;' 
                             + '&nbsp;<a href="javascript:void(0)" onclick="pageFunc_hm_clientbillDel()">' + $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Del + '</a>&nbsp;'; 
                    } 
                } 
        ]], 
        toolbar: grid_hm_clientbill_toolbar(), 
        onDblClickRow: function (rowIndex, rowData) { 
            $('#grid_wfrout').datagrid('clearSelections').datagrid('clearChecked').datagrid('checkRow', rowIndex); 
            pageFunc_hm_clientbillEdit(rowData.ID); 
        } 
    }); 
} 
function pageFunc_SearchDatahm_clientbill() { 
    $("#grid_hm_clientbill").datagrid('load', { 
        Name: $('#ui_wfrout_search').find('[name=Keyword]').val() 
    }); 
    clearSelect('grid_hm_clientbill'); 
} 
function pageFunc_hm_clientbillAdd() { 
    pageAttr.Added = true; 
    $('#ffhm_clientbill').form('clear'); 
    $('#win_hm_clientbill').dialog({ 
        title: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Add, 
        width: 500, 
        height: 280, 
        iconCls: 'icon-add', 
        modal: true, 
        buttons: [{ 
            id: 'btnSavehm_clientbill', 
            iconCls: 'icon-ok', 
            text: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Save, 
            handler: function () { 
                pageFunc_hm_clientbillSave(); 
            } 
        }, { 
            id: 'btnCancelwfrout', 
            iconCls: 'icon-cancel', 
            text: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Cancel, 
            handler: function () { 
                closeDialog('win_hm_clientbill'); 
            } 
        }], 
        onLoad: function () { 
            $('#hm_clientbill_Entity_Name').focus(); 
        } 
    }); 
} 
function pageFunc_hm_clientbillEdit(ID) { 
    if (ID != undefined && ID.length > 0) { 
        pageAttr.Added = false; 
        $('#win_hm_clientbill').dialog({ 
            title: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Edit, 
            width: 550, 
            height: 280, 
            iconCls: 'icon-edit', 
            modal: true, 
            buttons: [{ 
                id: "btnSavehm_clientbill", 
                iconCls: 'icon-ok', 
                text: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Save, 
                handler: function () { 
                    pageFunc_hm_clientbillSave(); 
                } 
            }, { 
                id: 'btnCancelhm_clientbill', 
                iconCls: 'icon-cancel', 
                text: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Cancel, 
                handler: function () { 
                    closeDialog('win_hm_clientbill'); 
                } 
            }], 
            onClose: function () { 
                closeDialog('win_hm_clientbill'); 
            } 
        }); 
        var ajaxUrl = pageAttr.JsonServerURL + 'hm_clientbill/AjaxGetByModel?id=' + $.LCLCore.ValidUI.Trim(ID); 
        $.post(ajaxUrl, function (resultData) { 
            if (resultData.Success) { 
                $('#hm_clientbill_Entity_ID').val(resultData.DataObject.ID); 
                $('#hm_clientbill_Entity_BillNumber').val(resultData.DataObject.BillNumber); 
                $('#hm_clientbill_Entity_IsDelete').val(resultData.DataObject.IsDelete); 
                $('#hm_clientbill_Entity_AddDate').val(resultData.DataObject.AddDate); 
                $('#hm_clientbill_Entity_UpdateDate').val(resultData.DataObject.UpdateDate); 
                $('#hm_clientbill_Entity_ClientHeatCharge_ID').val(resultData.DataObject.ClientHeatCharge_ID); 
            } 
        }, 'json'); 
 
    } else { 
        $.LCLMessageBox.Alert($.LCLPageModel.Resource.PageLanguageResource.LCLMessageBox_Message1); 
    } 
} 
function pageFunc_hm_clientbillSave() { 
    var ajaxUrl = ""; 
    if (pageAttr.Added) { 
        ajaxUrl = pageAttr.JsonServerURL + 'HM_ClientBill/AjaxAdd'; 
    } else { 
        ajaxUrl = pageAttr.JsonServerURL + 'HM_ClientBill/AjaxEdit'; 
    } 
 
    $('#ffhm_clientbill').form('submit', { 
        url: ajaxUrl, 
        onSubmit: function (param) { 
            $('#btnSavehm_clientbill').linkbutton('disable'); 
            param.ID = $('#hm_clientbill_Entity_ID').val(); 
            param.BillNumber = $('#hm_clientbill_Entity_BillNumber').val(); 
            param.IsDelete = $('#hm_clientbill_Entity_IsDelete').val(); 
            param.AddDate = $('#hm_clientbill_Entity_AddDate').val(); 
            param.UpdateDate = $('#hm_clientbill_Entity_UpdateDate').val(); 
            param.ClientHeatCharge_ID = $('#hm_clientbill_Entity_ClientHeatCharge_ID').val(); 
            if ($(this).form('validate')) 
                return true; 
            else { 
                $('#btnSavehm_clientbill').linkbutton('enable'); 
                return false; 
            } 
        }, 
        success: function (data) { 
            var resultData = eval('(' + data + ')'); 
            if (resultData.Success) { 
                flashTable('grid_hm_clientbill'); 
                if (pageAttr.Added) { 
 
                } else { 
                    closeDialog('win_hm_clientbill'); 
                } 
            } 
            $('#btnSavehm_clientbill').linkbutton('enable'); 
            $.LCLMessageBox.Alert(resultData.Message); 
        } 
    }); 
} 
function pageFunc_hm_clientbillDel() { 
    var rows = $("#grid_hm_clientbill").datagrid("getChecked"); 
    if (rows.length < 1) { 
        $.LCLMessageBox.Alert($.LCLPageModel.Resource.PageLanguageResource.LCLMessageBox_Message2); 
        return; 
    } 
    var parm; 
    $.each(rows, function (i, row) { 
        if (i == 0) { 
            parm = "idList=" + row.ID; 
        } else { 
            parm += "&idList=" + row.ID; 
        } 
    }); 
    $.LCLMessageBox.Confirm($.LCLPageModel.Resource.PageLanguageResource.LCLMessageBox_Message3, function (r) { 
        if (r) { 
            $.post(pageAttr.JsonServerURL + 'HM_ClientBill/AjaxDeleteList/', parm, 
            function (resultData) { 
                if (resultData.Success) { 
                    $.LCLMessageBox.Alert(resultData.Message,function () { 
                        InitGrid(); 
                    }); 
                } else { 
                    $.LCLMessageBox.Alert(resultData.Message); 
                } 
            }, "json"); 
        } 
    }); 
} 
function grid_hm_clientbill_toolbar() { 
  var ihtml = [{ 
        id: "btnAddhm_clientbill", 
        text: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Add, 
        iconCls: 'icon-add', 
        handler: function () { pageFunc_hm_clientbillAdd(); } 
    }, '-', { 
        id: "btnDelhm_clientbill", 
        text: $.LCLPageModel.Resource.PageLanguageResource.Page_Command_Del, 
        iconCls: 'icon-remove', 
        handler: function () { pageFunc_hm_clientbillDel(); } 
    }]; 
    return ihtml; 
} 

