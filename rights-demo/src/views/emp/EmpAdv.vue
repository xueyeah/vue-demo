<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="员工姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入员工姓名"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="emps" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" fixed align="left" label="姓名" width="130"></el-table-column>
      <el-table-column prop="workID" label="工号" align="left" width="135"></el-table-column>
      <el-table-column prop="gender" label="性别" align="left" width="95"></el-table-column>
      <el-table-column prop="birthday" width="135" align="left" label="出生日期"></el-table-column>
      <el-table-column prop="idCard" width="210" align="left" label="身份证号码"></el-table-column>
<!--      <el-table-column prop="wedlock" width="130" label="婚姻状况"></el-table-column>-->
      <el-table-column prop="nation.name" width="100" label="民族"></el-table-column>
      <el-table-column prop="nativePlace" width="100" label="籍贯"></el-table-column>
      <el-table-column prop="politicsstatus.name" width="120" label="政治面貌"></el-table-column>
      <el-table-column prop="email" width="180" align="left" label="电子邮件"></el-table-column>
      <el-table-column prop="phone" width="130" align="left" label="电话号码"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" >修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-circle-check" @click="handleDataScope(scope.row)" >数据权限</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.size"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
        </el-form-item>


        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="form.roleKey" :disabled="true" />
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  export default {
    name: "PerEmp",
    components: {
      Pagination
    },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 角色表格数据
        emps: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 是否显示弹出层（数据权限）
        openDataScope: false,
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          page: 1,
          size: 10,
          name: undefined
        },
        // 表单参数
        form: {},
        defaultProps: {
          children: "children",
          label: "label"
        },
        // 表单校验
        rules: {
          name: [
            { required: true, message: "角色名称不能为空", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询角色列表 */
      getList() {
        this.loading = true;
        let url = '/employee/basic/';
        this.getRequest(url).then(resp => {
          this.loading = false;
          if (resp) {
            this.emps = resp.data;
            this.total = resp.total;
          }
        });
        // listRole(this.addDateRange(this.queryParams, this.dateRange)).then(
        //   response => {
        //     this.roleList = response.rows;
        //     this.total = response.total;
        //     this.loading = false;
        //   }
        // );
      },

      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 取消按钮（数据权限）
      cancelDataScope() {
        this.openDataScope = false;
        this.reset();
      },
      // 表单重置
      reset() {
        if (this.$refs.menu != undefined) {
          this.$refs.menu.setCheckedKeys([]);
        }
        this.form = {
          roleId: undefined,
          name: undefined,
          roleSort: 0,
          status: "0",
          menuIds: [],
          deptIds: [],
          remark: undefined
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.roleId)
        this.single = selection.length!=1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.getMenuTreeselect();
        this.open = true;
        this.title = "添加角色";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const roleId = row.roleId || this.ids
        this.$nextTick(() => {
          this.getRoleMenuTreeselect(roleId);
        });
        getRole(roleId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改角色";
        });
      },
      /** 分配数据权限操作 */
      handleDataScope(row) {
        this.reset();
        this.$nextTick(() => {
          this.getRoleDeptTreeselect(row.roleId);
        });
        getRole(row.roleId).then(response => {
          this.form = response.data;
          this.openDataScope = true;
          this.title = "分配数据权限";
        });
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.roleId != undefined) {
              this.form.menuIds = this.getMenuAllCheckedKeys();
              updateRole(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              this.form.menuIds = this.getMenuAllCheckedKeys();
              addRole(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            }
          }
        });
      },
      /** 提交按钮（数据权限） */
      submitDataScope: function() {
        if (this.form.roleId != undefined) {
          this.form.deptIds = this.getDeptAllCheckedKeys();
          dataScope(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功");
              this.openDataScope = false;
              this.getList();
            } else {
              this.msgError(response.msg);
            }
          });
        }
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const roleIds = row.roleId || this.ids;
        this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRole(roleIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有角色数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then(function() {
          return exportRole(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  };
</script>
