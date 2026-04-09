import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerAppTools }         from "./tools/app.js";
import { registerInteractionTools } from "./tools/interaction.js";
import { registerGestureTools }     from "./tools/gestures.js";
import { registerAssertionTools }   from "./tools/assertions.js";
import { registerNavigationTools }  from "./tools/navigation.js";
import { registerScreenshotTools }  from "./tools/screenshot.js";
import { registerSessionTools }     from "./tools/session.js";

const server = new McpServer({
  name: "mobile-automation-agent",
  version: "1.0.0",
});

registerAppTools(server);
registerInteractionTools(server);
registerGestureTools(server);
registerAssertionTools(server);
registerNavigationTools(server);
registerScreenshotTools(server);
registerSessionTools(server);

process.on("SIGINT",  () => { server.close(); process.exit(0); });
process.on("SIGTERM", () => { server.close(); process.exit(0); });

const transport = new StdioServerTransport();
await server.connect(transport);