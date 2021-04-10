import { spawn } from "child_process";

export async function runService(
  serviceName: string,
  containerCommand: string
): Promise<number> {
  let args = [
    "-f",
    "docker-compose.yml",
    "-f",
    "ci-compose.yml",
    "run",
    "--rm",
    serviceName,
  ];

  if (containerCommand) {
    const containerArgs = containerCommand.split(" ").map((arg) => arg.trim());
    args = args.concat(containerArgs);
  }

  const command = spawn("docker-compose", args, { stdio: "inherit" });

  const exitCode = await new Promise((resolve, reject) => {
    command.on("close", resolve);
  });

  return exitCode as number;
}
