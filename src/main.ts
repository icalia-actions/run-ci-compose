import * as fs from "fs";
import { runService } from "./run-service";
import { getInput, setFailed } from "@actions/core";

async function run(): Promise<number> {
  if (!fs.existsSync("ci-compose.yml"))
    throw new Error("No ci-compose file exists");

  const serviceName = getInput("service-name");
  if (!serviceName) throw new Error("A service-name must be given");

  const command = getInput("command");
  return await runService(serviceName, command);
}

run()
  .then((status) => process.exit(status))
  .catch((error) => setFailed(error.message));
