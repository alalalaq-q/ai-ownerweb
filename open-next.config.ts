import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 作业场景不接 R2 缓存，用默认内存缓存即可。
export default defineCloudflareConfig({});
