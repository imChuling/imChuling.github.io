# 开发实验归档

这些补丁记录了从颗粒引擎到组合效果器的尝试，保留下来方便复盘，不是当前试听入口，也不应全部打开。

- export-granular-web / verify-granular-export：早期自动导出实验。
- shoegaze-pedal-studio / shoegaze-pedals-v2 / export-pedal-web：扁平合并 DSP 的早期版本；现已改为独立子补丁组合，避免内部命名冲突。
- 当时使用的文件名配置 `export_name` 不适用于 RNBO Web Export；正确字段为 `file_name`。

现用网页引擎和验证状态见网站 `assets/as-you-read/README.md`。历史脚本 `assets/as-you-read/tools/build-pedal-study.py` 仍反映旧扁平方案，仅供参考，不是构建当前模块化工程的入口。
