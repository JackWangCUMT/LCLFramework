﻿using System.ComponentModel;

namespace UIShell.RbacPermissionService
{
    /// <summary>
    /// 字典管理
    /// </summary>
    public partial class Dictionary : BaseTreeModel
    {
        /// <summary>
        /// 字典类型
        /// </summary>
        public DictType DictType { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 值
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
         [DefaultValue(0)]
        public int Order { get; set; }
    }
}
