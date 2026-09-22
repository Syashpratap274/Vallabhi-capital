import { spawn } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const children = [];

function start(args) {
  const child = spawn(npmCommand, args, {
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  children.push(child);
  return child;
}

const cms = start(["run", "cms:server"]);
const vite = start(["run", "dev:client", "--", ...process.argv.slice(2)]);

function stop(code = 0) {
  children.forEach((child) => child.kill());
  process.exit(code);
}

cms.on("exit", (code) => {
  if (code && !vite.killed) stop(code);
});
vite.on("exit", (code) => stop(code || 0));
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
