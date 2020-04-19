package org.javaboy.vhr.controller.system.basic;

import org.javaboy.vhr.model.Menu;
import org.javaboy.vhr.model.RespBean;
import org.javaboy.vhr.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 */
@RestController
@RequestMapping("/system/menu")
public class MenuController {
    @Autowired
    MenuService menuService;
    @GetMapping("/")
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }
    @PostMapping("/")
    public RespBean addMenu(@RequestBody Menu menu) {
        int result = menuService.insert(menu);
        if (result == 1) {
            return RespBean.ok("添加成功", menu);
        }
        return RespBean.error("添加失败");
    }

    @DeleteMapping("/{id}")
    public RespBean deleteMenuById(@PathVariable Integer id) {
        int result = menuService.deleteById(id);
        if (result == 1) {
            return RespBean.ok("删除成功");
        }
        return RespBean.error("删除失败");
    }
}