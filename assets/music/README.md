# Music 发布说明

首页：`portfolio_site.html#music`。采用原始的左侧叠放封面、右侧曲目列表布局。悬停或点按列表可切换封面；键盘上下方向键、Home、End 可选择作品。选中作品有视频 ID 时，点击前景封面打开播放器。四个作品顺序固定为 Piano Song、Live Band Highlights、Max/MSP Sound Study、HEARTBREAKER。

## 接入 YouTube

1. 上传视频至 YouTube，设为 Public 或 Unlisted（不公开列出，有链接可观看），开启 Allow embedding。
2. 从链接提取视频 ID，例如 `https://www.youtube.com/watch?v=ABCDEFGHIJK` 中的 `ABCDEFGHIJK`。
3. 在同目录 `music.js` 的 `MUSIC_VIDEOS` 中填入相应 ID。播放器按钮会自动启用；留空时显示待上线状态。
4. Piano Song 和 Max/MSP 完成后，还需更新首页对应的封面、状态描述和最终作品标题（包括封面按钮的 data-title）。
5. 通过 HTTP/HTTPS 预览和部署，再实测播放。直接双击 HTML 的 `file://` 环境可能因缺少 HTTP Referer 导致 YouTube error 153。

只有点击已启用封面后才加载 YouTube 播放器；关闭弹窗会停止播放，支持 Esc 关闭和键盘焦点返回。播放器提供 Watch on YouTube 备用入口。

## 部署资源

将整个“个人网页”目录部署到静态托管，包括 `assets/music/` 和字体目录。封面使用站点内相对 URL，可在根域名或子目录部署；不引用 `/Users/...` 或目录外的原视频。两部大型 MP4 未复制进站点。

如果之后选择自托管视频，应先压缩转码，再使用视频托管/CDN的 HTTPS 地址，并将播放器改为原生 video 或相应服务的嵌入播放器。
